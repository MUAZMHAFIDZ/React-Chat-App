import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  userSideBar,
  uploadPhotoController,
  updateUserController,
} from "../controllers/UserController.js";
import uploadPhoto from "../utils/uploadPhotoProfile.js";

const router = express.Router();

router.get("/", protectRoute, userSideBar);

router.put("/setting", protectRoute, updateUserController);
router.post(
  "/setting/photo",
  protectRoute,
  uploadPhoto.single("photoProfile"),
  uploadPhotoController
);

export default router;
