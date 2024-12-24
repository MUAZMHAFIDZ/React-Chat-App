const express = require("express");
const {
  sendMessage,
  receiveMessage,
} = require("../controllers/Messagecontroller.js");
const protectRoute = require("../middleware/protectRoute.js");

const router = express.Router();

router.get("/:id", protectRoute, receiveMessage);
router.post("/send/:id", protectRoute, sendMessage);

// Export menggunakan CommonJS
module.exports = router;
