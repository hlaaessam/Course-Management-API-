const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const { FAIL, ERROR } = require("../utils/httpStatusText");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = appError.create("token is required", 401, ERROR);
    return next(error);
  }

  const token = authHeader.split(" ")[1]; // Bearer tokenString

  try {
    const decodedCurrentUserData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ); // decode token and check if token/data is valid/exists
    // if token/data not valid do not complete the next step

    console.log(
      decodedCurrentUserData,
      "decodedCurrentUserData token data in verify middleware"
    );

    req.CurrentUserData = decodedCurrentUserData; // attach decoded data to req object to use it in next middlewares/controllers // next => verifytoken in delete endpoint
    next();
  } catch (err) {
    const error = appError.create("invalid token", 401, ERROR);
    return next(error);
  }
};

module.exports = verifyToken;
