// const express = require("express");
// const app = express();

// app.use(express.static("./views")); // applay static files

// package for middleware
// const morgan = require("morgan");
// app.use(morgan("dev")); // format dev

// manual middleware
// app.use((req, res, next) => {
//   console.log("method", req.method, "url", req.url);
//   next();
// });

// // Home route
// app.get("/", (req, res) => {
//   res.send("home");
// });
// // Products route
// app.get("/products", (req, res) => {
//   res.send([{ id: 1, name: "Hala" }]);
// });

require("dotenv").config(); // for use .env file
const express = require("express");
const mongoose = require("mongoose");
const coursesRouter = require("./routers/courses.router"); //to use router
const usersRouter = require("./routers/users.router"); //to use router

const httpStatusText = require("./utils/httpStatusText");
var cors = require("cors");

// create express app
const app = express();

// enable cors
app.use(cors());

const { ERROR } = httpStatusText;
const url = process.env.MONGO_URL; // get url from env more sequire
const port = process.env.PORT;

// to connect app with server (cluster in mongondb atls)
mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
});

// crud
app.use(express.json()); // to parse JSON bodies

// for default image
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //__dirname -> directory name //join -> merge dir with folder // to serve static files from uploads folder // for image access

app.use("/api/courses", coursesRouter); //put for all app // any request come to /api/courses will go to coursesRouter
app.use("/api/users", usersRouter);
//handle different routes not existes
app.use((req, res) => {
  res.status(404).json({
    status: ERROR,
    message: "this resource not available",
  });
});

// global error handling middleware
// receive error from asyncWrapper middleware as a parameter err
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || ERROR,
    message: err.message,
    code: err.statusCode || 500,
    data: null,
  });
});
// Start server
app.listen(port, () => {
  console.log("Server running on port 8000");
});
