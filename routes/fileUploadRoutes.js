const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileUploadController");
const upload = require("../utils/multer");

router.post("/", upload.single("picture"), fileController.create);

module.exports = router;
