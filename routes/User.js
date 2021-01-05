const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { signUp } = require("../controllers/User");

const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password should be atleast 5 characters long").isLength(
      5
    ),
    check("displayName", "Name should be atleast 2 characters long").isLength(
      2
    ),
  ],
  signUp
);

module.exports = router;
