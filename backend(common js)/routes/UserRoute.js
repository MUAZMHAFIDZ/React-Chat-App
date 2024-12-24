const express = require("express");
const protectRoute = require("../middleware/protectRoute.js");
const { userSideBar } = require("../controllers/UserController.js");

const router = express.Router();

router.get("/", protectRoute, userSideBar);

// Export menggunakan CommonJS
module.exports = router;
