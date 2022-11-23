const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);
router.put("/faceLolPost/:id", postsController.faceLolPost);
router.put("/faceSwearPost/:id", postsController.faceSwearPost);
router.put("/faceSadPost/:id", postsController.faceSadPost);

router.delete("/deletePost/:id", postsController.deletePost);

// @description     Show update page
// @route           GET /cards/updateCard/:id
router.get('/editPage/:id', ensureAuth, postsController.getEditPage)//leads to edit page where user can edit thier post.
// @description     Process edit form
// @route           PUT /cards/updateCard
router.put('/editPost/:id', ensureAuth, postsController.editPost)
module.exports = router;