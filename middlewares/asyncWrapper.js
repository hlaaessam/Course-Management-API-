// globle middleware to handle errors
module.exports = (asyncFn) => {
  return (req, res, next) => {
    // catch any error in async function and pass it to next middleware (exist in main.js)
    asyncFn(req, res, next).catch((err) => {
      next(err);
    });
  };
};
