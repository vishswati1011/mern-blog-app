const express = require("express");
const router = express.Router();
// const admin = require('./admin')
const users = require("./users/users");

router.use("/users", users);
// router.use('/admin',admin)

module.exports = router;
