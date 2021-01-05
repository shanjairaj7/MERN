const bcrypt = require("bcryptjs");
const User = require("../models/User");

const { body, validationResult } = require("express-validator");

exports.signUp = (req, res) => {
  const { email, password, displayName } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("EMPTY ERRORS");
    return res.status(403).json({ error: errors.array()[0].msg });
  }

  User.findOne({ email }, (err, user) => {
    console.log("USER FINDING");
    if (err || user) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }
  });

  const user = new User({
    email,
    password,
    displayName,
  });
  user.save((err, user) => {
    if (err) {
      console.log("ADDING A NEW USER");
    }

    return res.json(user);
  });
};
