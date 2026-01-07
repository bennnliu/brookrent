import cloudinary from "../config/cloudinarydb.js";
import multer from 'multer'

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } 
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
}});

export const uploadImage = (req, res, next) => {
    upload.array('photos',5)(req, res, async (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.json({ error: 'File too large. Max size is 5MB.' });
            }
            return res.json({ error: err.message });
        }
        try {
            if (!req.files) {
                return res.json({message: "No file uploaded" });
            }
            console.log("req.files:", req.files);
            const result = await Promise.all(req.files.map(file => 
                new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    resource_type: 'image', 
                    folder: 'brookrent'},
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(file.buffer)})));

            req.image_urls = result.map(r => r.secure_url);
            next()
        } catch (e) {
            console.error(e);
            return res.json({message: "Cloudinary error" });
        }
    });
}