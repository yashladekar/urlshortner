const express = require("express");
const router = express.Router();
const { handleSignup, handleLogin } = require("../controllers/users");
router.post("/signup", handleSignup);

router.post("/login", handleLogin);

module.exports = router;
