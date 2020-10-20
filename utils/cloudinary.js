const cloudinary = require("cloudinary");

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve(result.secure_url);
      },
      {
        folder: folder,
      }
    );
  });
};
