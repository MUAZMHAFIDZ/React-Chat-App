import express from "express";
import {
  sendMessage,
  receiveMessage,
} from "../controllers/Messagecontroller.js";
import protectRoute from "../middleware/protectRoute.js";
import uploadImage from "../utils/uploadImage.js";

const router = express.Router();

router.get("/:id", protectRoute, receiveMessage);
router.post(
  "/send/:id",
  protectRoute,
  uploadImage.single("image"),
  sendMessage
);

export default router;
