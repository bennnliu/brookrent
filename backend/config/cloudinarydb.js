require('dotenv').config()
const cloudinary = require('cloudinary').v2

const {CLOUDNAME, CLOUDKEY, CLOUDSECRET} = process.env

const cloud = cloudinary.config({
    cloud_name: CLOUDNAME,
    api_key: CLOUDKEY,
    api_secret: CLOUDSECRET
})

module.exports = cloud;