const express = require("express");
const router = express.Router();
const Users = require("../../../models/users/users");

router.get("/", async (req, res) => {
  const { userId } = req;
  try {
    const findUser = await Users.findById(userId)
    .select('username email imageUrl');
    if (!findUser) {
      return res.status(401).json({ message: "User not found!" });
    } else {
      res.status(201).json({
        message: "User profile fetched successfully.",
        data:findUser
      });
    } 
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: "Internal server error occured.",
      error: error,
    });
  }
});

module.exports = router;
