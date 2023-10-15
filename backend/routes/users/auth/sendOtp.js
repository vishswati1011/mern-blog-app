const express = require("express");
const router = express.Router();
const Users = require("../../../models/users/users");
const { sendOtpMail } = require("../../../middleware/sendMail");

router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await Users.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    const result = await sendOtpMail(email, otp);
    if (result) {
      res.status(201).json({
        message: "A verification is send to your mail.",
      });
    } else {
      res.status(400).json({
        error: "Failed to send verification code.",
        error: error,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Failed to send verification code.",
      error: error,
    });
  }
});

module.exports = router;
