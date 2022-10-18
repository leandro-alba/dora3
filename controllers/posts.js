const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Answer = require("../models/Answer");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({ createdAt: 'desc'});
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find().populate('user').sort({ createdAt: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user');
      const answers = await Answer.find({post: req.params.id}).populate('user').sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, answers: answers });
    } catch (err) {
      console.log(err);
    }
  },
  getAddAQuestion: async (req,res)=>{
    try{
      res.render('add-a-question.ejs')
    }catch(err){
      console.log(err)
    }
  },
  createPost: async (req, res) => {
    // try {
      // Upload image to cloudinary
    //   const result = await cloudinary.uploader.upload(req.file.path);

    //   await Post.create({
    //     question: req.body.title,
    //     description: req.body.description,
    //     tag: req.body.tag,
    //     image: result.secure_url,
    //     cloudinaryId: result.public_id,
    //     //caption: req.body.caption,
    //     likes: 0,
    //     faceLol: 0,
    //     faceSwear: 0,
    //     user: req.user.id,
    //   });
    //   console.log("Post has been added!");
    //   res.redirect("/profile");
    // } catch (err) {
    //   console.log(err);
    // }
    try{
      const post = {
        question: req.body.title,
         description: req.body.description,
         tag: req.body.tag,
          likes: 0,
         faceLol: 0,
         faceSwear: 0,
         faceSad: 0,
         user: req.user.id,
      }
      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        post['image'] = result.secure_url,
        post['cloudinaryId'] = result.public_id
      }
      await Post.create(post);
      console.log('post had been added!');
      res.redirect('/profile')
    }catch(err){
      console.log(err)
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  faceLolPost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { faceLol: 1 },
        }
      );
      console.log("facelol +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  faceSwearPost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { faceSwear: 1 },
        }
      );
      console.log("faceswear +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  faceSadPost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { faceSad: 1 },
        }
      );
      console.log("facesad +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
