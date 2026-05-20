const express = require("express");
const router = express.Router(); //small app from app

const { body } = require("express-validator");
const controller = require("../controllers/courses.controller");
const validateSchema = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const { ADMIN, MANAGER } = require("../utils/roles");
const allowedTo = require("../middlewares/allowedTo");

// // get all courses
// router.get("/", controller.getAllCourses);

// // get course by id
// router.get("/:id", controller.getCourse);

// //create course
// router.post(
//   "/",
//   [
//     body("title") //from req.body
//       .notEmpty()
//       .withMessage("Title is required")
//       .isLength({ min: 3 })
//       .withMessage("Title must be at least 3 characters long"),
//     body("price").notEmpty().withMessage("Price is required"),
//   ],
//   controller.createCourse
// );

// //update course
// router.patch("/:id", controller.updateCourse);

// // delete course
// router.delete("/:id", controller.deleteCourse);

// -------------

// use route from app or router for common paths to enhance readability and organization
router
  .route("/")
  .get(controller.getAllCourses) // get all courses
  .post(verifyToken, validateSchema(), controller.createCourse); // create course

router
  .route("/:id")
  .get(controller.getCourse) // get course by id
  .patch(controller.updateCourse) // supdate course
  .delete(verifyToken, allowedTo(ADMIN, MANAGER), controller.deleteCourse); // delete course

module.exports = router;
