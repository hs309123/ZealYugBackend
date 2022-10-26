const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  firstName: String,
  lastName: String,

  username: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  userData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
  },
});

const Users = mongoose.model("Users", schema);

module.exports = Users;
