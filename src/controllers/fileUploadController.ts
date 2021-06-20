import fs from 'fs';
import cloudinary from 'cloudinary';
import { Response, Request } from 'express';

const cloud = cloudinary.v2;

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(req: Request, res: Response) {
  const { path } = req.file;
  const uniqueFilename = new Date().toDateString();
  try {
    await cloud.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}` },
      async (err: any, image: any) => {
        if (err) return res.send(err);
        await fs.unlinkSync(path);
        const data = image.secure_url;
        res.json(data);
      },
    );
  } catch (e) {
    res.status(500).json(e);
  }
}
