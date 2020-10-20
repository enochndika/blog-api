const express = require("express");
const router = express.Router();
const likePostController = require("../../controllers/post/likePostController");
const verify = require("../../utils/verifyAccess");

router.get(
  "/",
  verify.requireSignin,
  verify.adminRessource,
  likePostController.allLikedPosts
);
router.get(
  "/total/:userId",
  verify.requireSignin,
  likePostController.postLikedByUser
);
router.get("/:postId", likePostController.likeByPostId);
router.post(
  "/:postId/:userId",
  verify.requireSignin,
  likePostController.createLike
);
router.delete(
  "/:postId/:userId",
  verify.requireSignin,
  likePostController.deleteLike
);

module.exports = router;
