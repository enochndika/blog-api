const express = require("express");
const router = express.Router();
const reportPostController = require("../../controllers/post/reportPostController");
const verify = require("../../utils/verifyAccess");

router.get("/", verify.requireSignin, reportPostController.allReports);
router.post(
  "/:postId/:userId",
  verify.requireSignin,
  reportPostController.report
);

module.exports = router;
