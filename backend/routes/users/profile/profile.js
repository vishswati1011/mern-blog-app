const express = require("express");
const router = express.Router();
const getProfile = require("./getProfile");
const editProfile = require("./editProfile");
const {verifyUserToken} = require('../../../middleware/verifyJwtToken')

router.use("/get", verifyUserToken, getProfile);
router.use("/edit", verifyUserToken, editProfile);

module.exports = router;
