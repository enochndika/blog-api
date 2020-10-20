const express = require("express");
const router = express.Router();
const reportChildCommentController = require("../../controllers/commentChild/reportChildCommentController");
const verify = require("../../utils/verifyAccess");

router.get(
  "/",
  verify.requireSignin,
  verify.adminRessource,
  reportChildCommentController.allReports
);

router.post(
  "/:childCommentId/:userId",
  verify.requireSignin,
  reportChildCommentController.report
);

module.exports = router;
