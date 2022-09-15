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

// INITIAL DOCUMENTS FOR BLOG
const initialBlogPost = [
  {
    blogPicture: "https://www.rd.com/wp-content/uploads/2019/09/Cute-cat-lying-on-his-back-on-the-carpet.-Breed-British-mackerel-with-yellow-eyes-and-a-bushy-mustache.-Close-up-e1573490045672.jpg",
    blogDate: "Sep 01, 2022",
    blogTitle: "First Blog Post",
    blogContent: "This is my first blog post on this database!"
  },
  {
    blogPicture: "https://www.rd.com/wp-content/uploads/2019/09/Cute-cat-lying-on-his-back-on-the-carpet.-Breed-British-mackerel-with-yellow-eyes-and-a-bushy-mustache.-Close-up-e1573490045672.jpg",
    blogDate: "Sep 12, 2022",
    blogTitle: "Second Blog Post",
    blogContent: "Let's go!"
  },
  {
    blogPicture: "https://www.rd.com/wp-content/uploads/2019/09/Cute-cat-lying-on-his-back-on-the-carpet.-Breed-British-mackerel-with-yellow-eyes-and-a-bushy-mustache.-Close-up-e1573490045672.jpg",
    blogDate: "Sep 16, 2022",
    blogTitle: "Third Blog Post",
    blogContent: "I'm a pro at this point!"
  }
]

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
