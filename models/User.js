const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  encrypted_password: {
    type: String,
    required: true,
    minlength: 5,
  },
  salt: String,
  displayName: {
    type: String,
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypted_password = this.hashPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  hashPassword: function (password) {
    if (!password) return "";

    const hashPassword = crypto
      .createHmac("sha256", this.salt)
      .update(password)
      .digest("hex");
    return hashPassword;
  },
};

module.exports = mongoose.model("User", UserSchema);
