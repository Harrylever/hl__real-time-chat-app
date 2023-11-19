const cloudinary = require('cloudinary').v2;
const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = require('../config/const');

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

function uploadImageToCloudinary(destImage, imagePublicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(destImage, { public_id: imagePublicId }, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

module.exports = uploadImageToCloudinary;

//
//
//
//
