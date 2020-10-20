const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/comment/commentController");
const verify = require("../../utils/verifyAccess");

router.get(
  "/",
  verify.requireSignin,
  verify.adminRessource,
  commentController.allComments
);
router.get("/:postId", commentController.commentsByPost);
router.post("/:postId", commentController.create);
router.put(`/:id/:userId`, verify.requireSignin, commentController.update);
router.delete(
  "/user/:id/:userId",
  verify.requireSignin,
  commentController.delete
);

router.delete(
  "/admin/:id",
  verify.requireSignin,
  verify.adminRessource,
  commentController.deleteByAdmin
);

module.exports = router;
