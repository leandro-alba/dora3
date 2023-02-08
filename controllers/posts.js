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
      //const user = await User.findById
      const post = await Post.findById(req.params.id).populate('user');
      const answers = await Answer.find({post: req.params.id}).populate('user').sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, answers: answers });//used to have it as {post:post, user:req.user, answers:answers}
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
   
    try{
      const post = {
        question: req.body.question,
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
      const post = await Post.findById(req.params.id)
      if(post.likedBy.includes(req.user.id)){
        await Post.findByIdAndUpdate(req.params.id,{
          $inc:{
            likes: -1
          }
        })
        await Post.findByIdAndUpdate(req.params.id, {
          $pull:{
            likedBy: req.user.id
          }
        })  
      }else{
        await Post.findByIdAndUpdate(req.params.id, {
          $inc: {
            likes: 1
          }
        })
        await Post.findByIdAndUpdate(req.params.id, {
          $push: {
            likedBy: req.user.id
          }
        })
      }
      console.log("Likes +/-1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  faceLolPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if(post.likedByFaceLol.includes(req.user.id)){
        await Post.findByIdAndUpdate(req.params.id,{
          $inc:{
            faceLol: -1
          }
        })
        await Post.findByIdAndUpdate(req.params.id, {
          $pull:{
            likedByFaceLol: req.user.id
          }
        })  
      }else{
        await Post.findByIdAndUpdate(req.params.id, {
          $inc: {
            faceLol: 1
          }
        })
        await Post.findByIdAndUpdate(req.params.id, {
          $push: {
            likedByFaceLol: req.user.id
          }
        })
      }
      console.log("facelol +/-1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  faceSwearPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if(post.likedByFaceSwear.includes(req.user.id)){
        await Post.findByIdAndUpdate(req.params.id,{
          $inc:{
            faceSwear: -1
          }
        })
        await Post.findByIdAndUpdate(req.params.id, {
          $pull:{
            likedByFaceSwear: req.user.id
          }
        })  
      }else{
        await Post.findByIdAndUpdate(req.params.id, {
          $inc: {
            faceSwear: 1
          }
        })
        await Post.findByIdAndUpdate(req.params.id, {
          $push: {
            likedByFaceSwear: req.user.id
          }
        })
      }
      console.log("faceSwear +/-1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  faceSadPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if(post.likedByFaceSad.includes(req.user.id)){
        await Post.findByIdAndUpdate(req.params.id,{
          $inc:{
            faceSad: -1
          }
        })
        await Post.findByIdAndUpdate(req.params.id, {
          $pull:{
            likedByFaceSad: req.user.id
          }
        })  
      }else{
        await Post.findByIdAndUpdate(req.params.id, {
          $inc: {
            faceSad: 1
          }
        })
        await Post.findByIdAndUpdate(req.params.id, {
          $push: {
            likedByFaceSad: req.user.id
          }
        })
      }
      console.log("faceSad +1");
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
      if(post.image){//I coded this shit! :D XD :')
        await cloudinary.uploader.destroy(post.cloudinaryId);
      }
      // Delete post from db
      await Post.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      console.log(err)
      res.redirect("/profile");
    }
  },
  getEditPage: async (req,res) => {//take user to an edit page
    try{
      const post = await Post.findById(req.params.id).lean()

      res.render('editPost.ejs', { post: post })
    }catch(err){
      console.error(err)
    }
  },
  editPost: async (req,res) => {//the update logic here
    try{
      if(req.file){//req.file
        await Post.findOneAndUpdate({_id: req.params.id },{
          question: req.body.question,
         description: req.body.description,
         tag: req.body.tag,
        })
       let post = await Post.findById({ _id: req.params.id });
        const result = await cloudinary.uploader.upload(req.file.path);
        post['image'] = result.secure_url,
        post['cloudinaryId'] = result.public_id
        await post.save()//this replaces the old image with the new one, thank you to 100dev community for this line! 
        res.redirect('/')
      }else{
        await Post.findOneAndUpdate({_id: req.params.id },{
          question: req.body.question,
         description: req.body.description,
         tag: req.body.tag,
        })
        res.redirect('/')
      }
      
      console.log('Post edited');
      //res.redirect(`/`)
    }catch(err){
      console.error(err)
    }
  },
};
