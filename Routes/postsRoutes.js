const express = require("express");
const router = express();
const postController = require("../Controllers/postsController");
const multer = require("multer");

// ************************ POSTS ******************************
// CREATE NEW POST:
const upload = multer({
  limits: {
    fileSize: 500000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Invalide File Format"));
    }
    cb(undefined, true);
  },
});
router.post("/", upload.single("file"), postController.createPost);

// GET ALL POSTS:
router.get("/", postController.getPosts);
// GET UNIQUE POST:
router.get("/:id", postController.getPost);

// UPDATE POST :
router.put("/:id", postController.updatePost);
// DELETE POST :
router.delete("/:id", postController.deletePost);

// ************************ LIKES/UNLIKES (POSTS)******************************
// LIKE
router.patch("/like/:id", postController.likePost);
//UNLIKE
router.patch("/unlike/:id", postController.unlikePost);

// ************************ COMMENTS ******************************
router.patch("/add-comment/:id", postController.addComment);
router.patch("/edit-comment/:id", postController.editComment);
router.patch("/delete-comment/:id", postController.deleteComment);

//
//
module.exports = router;
