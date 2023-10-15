const express = require("express");
const router = express.Router();
const login = require("./login");
const register = require("./register");
const sendOtp = require('./sendOtp');
const forgotPassword = require('./forgotpass');

router.use("/login", login);
router.use("/register", register);
router.use("/sendOtp", sendOtp);
router.use("/forgotPassword", forgotPassword);

module.exports = router;
