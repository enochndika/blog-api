const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/userController");
const verify = require("../../utils/verifyAccess");

router.get("/:username", userController.read);
router.get(
  "/",
  verify.requireSignin,
  verify.adminRessource,
  userController.list
);
router.put("/:id", verify.requireSignin, userController.update);
router.delete("/:id", verify.requireSignin, userController.delete);
router.delete(
  "/admin/:id",
  verify.requireSignin,
  verify.adminRessource,
  userController.deleteByAdmin
);

module.exports = router;
