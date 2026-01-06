import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const {CLOUDNAME, CLOUDKEY, CLOUDSECRET} = process.env

cloudinary = cloudinary.config({
    cloud_name: CLOUDNAME,
    api_key: CLOUDKEY,
    api_secret: CLOUDSECRET
})

export default cloudinary;