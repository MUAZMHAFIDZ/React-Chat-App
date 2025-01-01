const express = require("express");
const protectRoute = require("../middleware/protectRoute.js");
const {
  userSideBar,
  uploadPhotoController,
  updateUserController,
} = require("../controllers/UserController.js");
const uploadPhoto = require("../utils/uploadPhotoProfile.js");

const router = express.Router();

router.get("/", protectRoute, userSideBar);

router.put("/setting", protectRoute, updateUserController);
router.post(
  "/setting/photo",
  protectRoute,
  uploadPhoto.single("photoProfile"),
  uploadPhotoController
);

module.exports = router;
