const Post = require("../models/Post");

module.exports = {
    getIndex: async (req, res) => {
      try{
        const posts = await Post.find().populate('user').sort({ createdAt: 'desc' }).lean();
        res.render('index.ejs', {posts: posts });
      }catch (err){
        console.log(err)
      }
    },
  };
  