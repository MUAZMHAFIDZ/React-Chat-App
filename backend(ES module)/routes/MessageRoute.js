import express from "express";
import {
  sendMessage,
  receiveMessage,
  deleteMessage,
} from "../controllers/MessageController.js";
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
router.delete("/delete/:id", protectRoute, deleteMessage);

export default router;
