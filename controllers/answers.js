const Answer = require("../models/Answer");

module.exports = {
  createAnswer: async (req, res) => {
    try {
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
      let answer = await Answer.findById({ _id: req.params.id});
      await Answer.remove({ _id: req.params.id});
      console.log('answer deleted')
      res.redirect('/post/:id')
    }catch(err){
      res.redirect('/post/:id')
    }
  }
};
