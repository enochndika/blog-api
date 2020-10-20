const express = require("express");
const router = express.Router();
const mockController = require("../controllers/mockController");

router.post("/users", mockController.createUser);
router.post("/posts", mockController.createPost);
router.post("/comments/:id", mockController.createComment);
router.post("/categories", mockController.createPostCategory);
router.post("/child-comments/:userId", mockController.createChildComments);
router.post("/like-posts/:userId", mockController.likePosts);

module.exports = router;
