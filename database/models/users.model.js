const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'reader'
  }
});

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
