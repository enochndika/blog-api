const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: "Ce format n'est pas supporté ",
      },
      false
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
module.exports = upload;
