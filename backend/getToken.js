const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/get-token", (req, res) => {
    const API_KEY = process.env.API_KEY;
    const SECRET = process.env.SECRET_KEY;

    const options = {
        expiresIn: "120m",
        algorithm: "HS256",
    };
    const permissions = [];

    if (req.body.mod) {
        // `ask_join` || `allow_mod`
        permissions.push("allow_join");
        permissions.push("allow_mod");
    } else {
        permissions.push("ask_join");
    }

    const payload = {
        apikey: API_KEY,
        permissions: permissions,
        version: 2,
        roles: ["CRAWLER"],
    };

    const token = jwt.sign(payload, SECRET, options);
    res.json({ authToken: token });
});

module.exports=router