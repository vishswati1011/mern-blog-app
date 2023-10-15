const express = require("express");
const router = express.Router();
const Users = require("../../../models/users/users");
const { compareHashPassword } = require("../../../utilies/authPassword");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password, loginType } = req.body;
  try {
    const findUser = await Users.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "Invalid credentials!" });
    } else if (loginType === "google") {
      const token = jwt.sign(
        {
          ...findUser,
        },
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({
        message: "Login successfully.",
        token,
      });
    } else {
      const dbpass = findUser.password;
      if (compareHashPassword(password, dbpass)) {
        const token = jwt.sign(
          {
            ...findUser,
          },
          process.env.JWT_SECRET_KEY
        );
        res.status(201).json({
          message: "Login successfully.",
          token,
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials!" });
      }
    }
  } catch (error) {
    res.status(400).json({
      error: "Internal server error occured.",
      error: error,
    });
  }
});

module.exports = router;
