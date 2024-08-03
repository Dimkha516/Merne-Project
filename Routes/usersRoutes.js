const router = require("express").Router();
const usersController = require("../Controllers/usersControllers");
const authController = require("../Controllers/authController");
const uploadController = require("../Controllers/upload.controller");
const multer = require("multer");
// const { uploadErrors } = require("../Utils/errors.utils");

//*********************************** AUTH ******************/
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//*********************************** USER ******************/
//GET ALL USERS :
router.get("/", usersController.getUsers);

// GET UNIQUE USER :
router.get("/:id", usersController.getUser);

// UPDATE USER :
router.put("/:id", usersController.updateUser);

// DELETE USER :
router.delete("/:id", usersController.deleteUser);

//FOLLOWING :
router.patch("/follow/:id", usersController.follow);

//UNFOLLWING :
router.patch("/unfollow/:id", usersController.unfollow);

// UPLOAD:

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
router.post("/upload", upload.single("file"), uploadController.uploadProfil);
//
module.exports = router;
