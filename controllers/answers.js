const Answer = require("../models/Answer");
const User = require("../models/User");
const Post = require('../models/Post')

module.exports = {
  createAnswer: async (req, res) => {
    try {
      //const answerUser = await User.findById(req.user.id)
      await Answer.create({
        answer: req.body.answer,
        user: req.params.id,
        userName: req.user.userName,
        likes: 0,
        post: req.params.id,
        image: req.user.image //experimental, first time trying this
      });
      console.log("Answer has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteAnswer: async (req,res) => {
    try{
      await Answer.findByIdAndDelete({ _id: req.params.id});
      console.log('answer deleted')
      res.redirect('/')// so i cant get it to refresh atthe post where the answer was deleted so for now it will redirect to landingpage. But the important thing is taht the delete btn works!
    }catch(err){
      res.redirect('/')
    }
  }
};
