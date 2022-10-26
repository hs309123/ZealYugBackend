const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comments = mongoose.model("Comments", schema);

module.exports = Comments;
