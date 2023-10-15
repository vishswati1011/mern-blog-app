const express = require("express");
const router = express.Router();
const auth = require("./auth/auth");
const profile = require('./profile/profile')

router.use("/auth", auth);
router.use('/profile',profile);

module.exports = router;
