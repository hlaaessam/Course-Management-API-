const { default: PasswordPrompt } = require("inquirer/lib/prompts/password");
const mongoose = require("mongoose");
const { token } = require("morgan");
const validator = require("validator");
const { USER, ADMIN, MANAGER } = require("../utils/roles");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [USER, ADMIN, MANAGER],
    default: USER,
  },
  avatar: {
    type: String,
    default: "/uploads/avatar2.webp", // if no image uploaded use default image
  },
});
module.exports = mongoose.model("User", userSchema);
