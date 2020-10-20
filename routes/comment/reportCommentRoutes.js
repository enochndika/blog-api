const express = require("express");
const router = express.Router();
const reportCommentController = require("../../controllers/comment/reportCommentController");
const verify = require("../../utils/verifyAccess");

router.get("/", verify.requireSignin, reportCommentController.allReports);

router.post(
  "/:commentId/:userId",
  verify.requireSignin,
  reportCommentController.report
);

module.exports = router;
