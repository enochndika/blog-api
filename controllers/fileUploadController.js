const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.create = async (req, res) => {
  const { path } = req.file;
  const uniqueFilename = new Date().toDateString();
  try {
    await cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}` },
      async (err, image) => {
        if (err) return res.send(err);
        // remove file from server
        await fs.unlinkSync(path);
        const data = image.secure_url;
        res.json(data);
      }
    );
  } catch (e) {
    res.status(500).json(e);
  }
};
