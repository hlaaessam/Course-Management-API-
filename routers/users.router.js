const express = require("express");
const router = express.Router(); //small app from app

const controller = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verifyToken");
// const validateSchema = require("../middlewares/validationSchema");
// // get all users

// multer used to upload imges in file uploads //uploade files from form data
const multer = require("multer");
const appError = require("../utils/appError");
const storage = multer.diskStorage({
  // Express how and where to store the files
  destination: function (req, file, cb) {
    //callback take error and folder name
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    console.log(file, "file in filename");
    const ext = file.mimetype.split("/")[1]; // extract/get file extension like png or jpg

    // create unique file name to avoid override from different users
    const fileName = `user-${
      Date.now() + "-" + Math.round(Math.random() * 1e9)
    }.${ext}`;
    cb(null, fileName);
  },
});

//
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    cb(null, true); // accept file
  } else {
    cb(appError.create("must be an image file", 400), false); // reject file
  }
};

const upload = multer({ storage: storage, fileFilter });
router.route("/").get(verifyToken, controller.getAllUsers); // get all users

router
  .route("/register")
  .post(upload.single("avatar"), controller.rigesterUser); // register user

router.route("/login").post(controller.loginUser); // login user
module.exports = router;
