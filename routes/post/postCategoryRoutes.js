const express = require("express");
const router = express.Router();
const postCategoryController = require("../../controllers/post/postCategoryController");
const verify = require("../../utils/verifyAccess");

router.get("/", postCategoryController.list);
router.post(
  "/",
  verify.requireSignin,
  verify.adminRessource,
  postCategoryController.create
);
router.put(
  "/:id",
  verify.requireSignin,
  verify.adminRessource,
  postCategoryController.update
);
router.delete(
  "/:id",
  verify.requireSignin,
  verify.adminRessource,
  postCategoryController.delete
);

module.exports = router;
