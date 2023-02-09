require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const router = require('express').Router()
const mongoose = require("mongoose");
const AuthRoute = require('./routes/auth')
const BlogPostRoute = require('./routes/blog_posts')
// const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (!err) {
      console.log("Database connected! Welcome to mongoDB.");
    } else {
      console.log(err);
    }
  }
);

// MIDDLEWARE AND API ROUTER
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", AuthRoute);
app.use("/api", BlogPostRoute);

// ERROR HANDLING
router.use((error, req, res, next) => {
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
  });
});

module.exports = { app };