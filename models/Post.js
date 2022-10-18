const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true
  },
  image: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
   tag: {
     type: String,
     required: true,
   },
  likes: {
    type: Number,
    required: true,
  },
  faceLol:{ //<i class="fa-regular fa-face-grin-tears"></i>
    type: Number,
    required: true,
  },
  faceSwear:{ //<i class="fa-regular fa-face-swear"></i>
    type: Number,
    required: true,
  },
  faceSad:{ //<i class="fa-regular fa-face-swear"></i>
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",//referencing the User schema
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
