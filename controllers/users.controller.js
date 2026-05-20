// const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");
const { SUCCESS, ERROR, FAIL } = httpStatusText;

const getAllUsers = asyncWrapper(async (req, res, next) => {
  //for pagination
  //take query parameters from url
  const query = req.query;
  const limit = query.limit || 2; // kam user hyzhar
  const page = query.page || 1; // f anhi page
  const skip = (page - 1) * limit; // h skip ad eh 3ala 7asb el page
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: SUCCESS, data: { users } });
});
const rigesterUser = asyncWrapper(async (req, res, next) => {
  // console.log(req.body);
  console.log(req.file, "req file"); // multer add file to req object

  const { firstName, lastName, email, password, role } = req.body;

  const dublicateUser = await User.findOne({ email });
  if (dublicateUser) {
    const error = appError.create("user already exists", 400, FAIL);
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10); //hash password before save to data base
  // hash take two parameters first the password second the salt (string add to password)
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename, // get file name from req.file added by multer
  });

  // sign take three parameters first the payload (data want to encode in the token) second secret key to sign the token third options like expiration time
  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  // console.log("Token generated:", token);

  newUser.token = token;
  await newUser.save();

  res.status(201).json({ status: SUCCESS, data: { user: newUser } });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    const error = appError.create("email and password are required", 400, FAIL);
    return next(error);
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = appError.create("user not found", 400, FAIL);
    return next(error);
  }

  const isPasswormatched = await bcrypt.compare(password, user.password);

  if (user && isPasswormatched) {
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return res.json({
      status: SUCCESS,
      data: { token },
    });
  } else {
    const error = appError.create("data incorrect", 500, ERROR);
    return next(error);
  }
});

module.exports = {
  getAllUsers,
  rigesterUser,
  loginUser,
};
