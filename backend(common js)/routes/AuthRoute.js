const express = require("express");
const { signup, login, logout } = require("../controllers/AuthController.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Export menggunakan CommonJS
module.exports = router;
