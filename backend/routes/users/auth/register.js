const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Users = require("../../../models/users/users");
const jwt = require("jsonwebtoken");

router.post(
  "/",
  [
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be of 6 characters long").isLength({
      min: 6,
    }),
    body("email", "enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const { email, password, username } = req.body;
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    try {
      const findUser = await Users.findOne({ email });
      if (findUser) {
        return res.status(400).json({ message: "User already exist." });
      } else {
        const user = {
          email,
          username,
          password,
        };
        const saveuser = new Users(user);
        saveuser.save().then((savedUser)=>{
            console.log("savedUser", savedUser);
            const token = jwt.sign(
              {
                ...savedUser,
              },
              process.env.JWT_SECRET_KEY
            );
            res.status(201).json({
                message: "Register successfully.",
                token,
              });
        })
      }
    } catch (error) {
      res.status(400).json({
        error: "Internal server error occured.",
        error: error,
      });
    }
  }
);

module.exports = router;
