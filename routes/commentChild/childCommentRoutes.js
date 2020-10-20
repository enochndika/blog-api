const express = require("express");
const router = express.Router();
const childCommentController = require("../../controllers/commentChild/childCommentController");
const verify = require("../../utils/verifyAccess");

router.get(
  "/",
  verify.requireSignin,
  verify.adminRessource,
  childCommentController.allChildComments
);
router.get("/:commentId", childCommentController.childCommentsByCommentId);
router.post("/:commentId", verify.requireSignin, childCommentController.create);
router.put(`/:id`, verify.requireSignin, childCommentController.update);
router.delete(
  "/user/:id/:userId",
  verify.requireSignin,
  childCommentController.delete
);
router.delete(
  "/admin/:id",
  verify.requireSignin,
  verify.adminRessource,
  childCommentController.deleteByAdmin
);

module.exports = router;
