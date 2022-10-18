const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  userName:{
    type: String,
    ref: "User"
  },
  image:{
    type: String,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Answer", AnswerSchema);