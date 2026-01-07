import { v2 as cloudinary } from 'cloudinary';

const {CLOUDINDARY_CLOUD_NAME, CLOUDINDARY_API_KEY, CLOUDINARY_SECRET_KEY} = process.env

cloudinary.config({
    cloud_name: CLOUDINDARY_CLOUD_NAME,
    api_key: CLOUDINDARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY
})

export default cloudinary;