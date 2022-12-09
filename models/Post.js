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
  likedBy:[{//likeBy is used to control our likes. so that users can only like a post once or they can take their like back!
    type: mongoose.Schema.Types.ObjectId//notice that its in an array
  }],
  faceLol:{ //<i class="fa-regular fa-face-grin-tears"></i>
    type: Number,
    required: true,
  },
  likedByFaceLol:[{
    type: mongoose.Schema.Types.ObjectId
  }],
  faceSwear:{ //<i class="fa-regular fa-face-swear"></i>
    type: Number,
    required: true,
  },
  likedByFaceSwear:[{
    type: mongoose.Schema.Types.ObjectId
  }],
  faceSad:{ //<i class="fa-regular fa-face-swear"></i>
    type: Number,
    required: true,
  },
  likedByFaceSad:[{
    type: mongoose.Schema.Types.ObjectId
  }],
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
