const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Users = require("../../../models/users/users");

router.post(
  "/",
  [
    body("password", "Password must be of 6 characters long").isLength({
      min: 6,
    }),
    body("email", "enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    try {
      const findUser = await Users.findOne({ email });
      if (!findUser) {
        return res.status(400).json({ message: "Invalid credentials!" });
      } else {
        Users.updateOne({ email }, { $set: { password: password } }).then(
          () => {
            res.status(201).json({
              message: "Password update successfully.",
            });
          }
        );
      }
    } catch (error) {
      res.status(400).json({
        error: "Failed to update the password",
        error: error,
      });
    }
  }
);

module.exports = router;
