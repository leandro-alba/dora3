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


module.exports = router;
