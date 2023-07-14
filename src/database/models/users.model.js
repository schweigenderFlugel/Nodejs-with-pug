const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    match: [/^\S[a-zA-Z0-9]+$/, "Only letters and numbers allowed for username"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email adress']
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: 'reader',
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  refreshToken: {
    type: String,
    default: null,
  }
});

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
