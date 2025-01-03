const express = require("express");
const {
  sendMessage,
  receiveMessage,
  deleteMessage,
} = require("../controllers/Messagecontroller.js");
const protectRoute = require("../middleware/protectRoute.js");
const uploadImage = require("../utils/uploadImage.js");

const router = express.Router();

router.get("/:id", protectRoute, receiveMessage);
router.post(
  "/send/:id",
  protectRoute,
  uploadImage.single("image"),
  sendMessage
);
router.delete("/delete/:id", protectRoute, deleteMessage);

module.exports = router;
