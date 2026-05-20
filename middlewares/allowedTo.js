const appError = require("../utils/appError");
const { FAIL } = require("../utils/httpStatusText");

module.exports = (...allowedRoles) => {
  console.log(allowedRoles, "allowed roles");

  return (req, res, next) => {
    if (!allowedRoles.includes(req.CurrentUserData.role)) {
      return next(
        appError.create(
          "your role is not allowed to access this route",
          401,
          FAIL
        )
      );
    }

    next();
  };
};
