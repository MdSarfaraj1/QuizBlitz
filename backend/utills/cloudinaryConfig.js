const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'quiz_app', // Folder in Cloudinary
    public_id: (req) => `user_${req.user._id}_avatar`, // Custom file name
    allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed extensions
    overwrite: true, // Overwrite if same public_id exists
  },
});


  module.exports={cloudinary,storage};