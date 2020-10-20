const express = require("express");
const router = express.Router();
const postFilterController = require("../../controllers/post/postFilterController");
const verify = require("../../utils/verifyAccess");

router.get("/category/:postsCategoryId", postFilterController.postsByCategory);
router.get("/trend-posts", postFilterController.trendPosts);
router.get("/related/:postId", postFilterController.postsRelated);
router.get("/vip", postFilterController.postsVip);
router.get("/search", postFilterController.search);
router.get(
  "/user/:userId",
  verify.requireSignin,
  postFilterController.postsByUserId
);

module.exports = router;
