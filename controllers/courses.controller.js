// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");

const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { SUCCESS, ERROR, FAIL } = httpStatusText;

const getAllCourses = asyncWrapper(async (req, res) => {
  // find take two paramters fisrt is query filter
  // const courses = await Course.find({price:800});  -> hyrg3 bs course his price 800
  // const courses = await Course.find({ price: { $gt: 800 } }); -> gt = greater than mongodb operator .

  // second is projection find({},{"__v":false}) -> shel __v mn responce

  //for pagination
  //take query parameters from url
  const query = req.query;
  const limit = query.limit || 2; // kam course hyzhar
  const page = query.page || 1; // f anhi page
  const skip = (page - 1) * limit; // h skip ad eh 3ala 7asb el page
  const courses = await Course.find({}, { " __v": false })
    .limit(limit)
    .skip(skip); // law msh 3ayza query filter b7ot {} fadi awa m7tsh 7aga 5als
  res.json({ status: SUCCESS, data: { courses } });
});
// use globle error handling middleware(asyncWrapper) instead of try catch in every async function
const getCourse = asyncWrapper(async (req, res, next) => {
  // const id = +req.params.id;
  // const course = courses.find((c) => c.id === id);

  // try {
  const course = await Course.findById(req.params.id); // mongoose method to find by id // we do not need to check it is num or not cause the schema handel it
  if (!course) {
    const error = appError.create("course not found", 404, FAIL);
    return next(error);
    // return res
    //   .status(404)
    //   .json({ status: FAIL, data: { course: "course not found" } });
  }

  return res.status(200).json({ status: SUCCESS, data: { course } });
  // } catch (err) {
  //   return res.status(400).json({
  //     status: ERROR,
  //     data: null,
  //     message: err.message,
  //     code: 400,
  //   });
  // }
});

const createCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, FAIL);
    return next(error);
    // return res
    //   .status(400)
    //   .json({ status: FAIL, data: { errors: errors.array() } }); // error mn sended data
  }
  // const course = { id: courses.length + 1, ...req.body };
  // courses.push(course);

  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json({ status: SUCCESS, data: { course: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res) => {
  // const id = +req.params.id;
  // let course = courses.find((c) => c.id === id);
  // if (!course) {
  // return res.status(404).json({ message: "Course not found" });
  // }
  //  courses = courses.filter((c) => c.id !== id); // delete el course el 2adyem
  // course = { ...course, ...req.body }; // el title , price he override el fi el course
  // courses.push(course);
  // res.status(200).json(course);

  // try {
  // const findCourseBeforeUpdated = await Course.findByIdAndUpdate(req.params.id,{$set:{...req.body}})
  const updatedCourse = await Course.updateOne(
    { _id: req.params.id },
    { $set: { ...req.body } }, // set called operators
  );
  return res
    .status(200)
    .json({ status: SUCCESS, data: { course: updatedCourse } });
  // } catch (e) {
  //   return res
  //     .status(400)
  //     .json({ status: ERROR, data: null, message: e.message, code: 400 }); // exception -> error gai mn db
  // }
});
const deleteCourse = asyncWrapper(async (req, res) => {
  // const id = +req.params.id;
  // courses = courses.filter((c) => c.id !== id);

  await Course.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: SUCCESS, data: null });
});

module.exports = {
  deleteCourse,
  updateCourse,
  createCourse,
  getCourse,
  getAllCourses,
};
