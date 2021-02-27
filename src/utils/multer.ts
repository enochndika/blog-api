import multer from 'multer';
import { Request, Express } from 'express';

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, './uploads/');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, new Date().toDateString() + '-' + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: "Ce format n'est pas supporté ",
      },
      false,
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3840 * 2160,
  },
  fileFilter: fileFilter,
});

export default upload;
