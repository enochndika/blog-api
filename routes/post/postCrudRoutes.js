const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post/postCrudController");
const verify = require("../../utils/verifyAccess");

router.get("/read/:slug", postController.read);
router.get("/", postController.list);
router.post("/:userId", verify.requireSignin, postController.create);
router.put("/:postId/:userId", verify.requireSignin, postController.update);
router.delete("/:postId/:userId", verify.requireSignin, postController.delete);
router.delete(
  "/:postId",
  verify.requireSignin,
  verify.adminRessource,
  postController.deleteByAdmin
);
router.param("postId", postController.postById);

module.exports = router;
