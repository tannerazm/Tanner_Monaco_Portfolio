const BlogPost = require("../models/Blog_Posts");

const CreatePost = async (req, res, next) => {
  await BlogPost.insertMany({ blogPicture: req.body.blogPicture, blogDate: req.body.blogDate, blogTitle: req.body.blogTitle, blogContent: req.body.blogContent })
  .then((blogPost) => {
    if(blogPost) {
        res.json({
          message: "You Successfully Created a Blog Post!",
          blogPost: blogPost
        })
    }
  })
}

const GetPosts = async (req, res, next) => {
  BlogPost.find()
  .then((post) => {
    if(post) {
        res.json({
          post: post
        })
    }
  })
}

const UpdatePostPhoto = async (req, res, next) => {
  await BlogPost.updateOne({ _id: req.params.postID }, { blogPicture: req.body.blogPicture })
  .then((blogPost) => {
    if(blogPost) {
        res.json({
          message: "You Successfully Updated the Blog Post Photo!",
          blogPost: blogPost
        })
    }
  })
}

const UpdatePostDate = async (req, res, next) => {
  await BlogPost.updateOne({ _id: req.params.postID }, { blogDate: req.body.blogDate })
  .then((blogPost) => {
    if(blogPost) {
        res.json({
          message: "You Successfully Updated the Blog Post Date!",
          blogPost: blogPost
        })
    }
  })
}

const UpdatePostTitle = async (req, res, next) => {
  await BlogPost.updateOne({ _id: req.params.postID }, { blogTitle: req.body.blogTitle })
  .then((blogPost) => {
    if(blogPost) {
        res.json({
          message: "You Successfully Updated the Blog Post Title!",
          blogPost: blogPost
        })
    }
  })
}

const UpdatePostContent = async (req, res, next) => {
  await BlogPost.updateOne({ _id: req.params.postID }, { blogContent: req.body.blogContent })
  .then((blogPost) => {
    if(blogPost) {
        res.json({
          message: "You Successfully Updated the Blog Post Content!",
          blogPost: blogPost
        })
    }
  })
}

const DeletePost = async (req, res, next) => {
  const id = req.params.postID

  const postFound = await BlogPost.findOne({ _id: id })
  if(postFound) {
    await BlogPost.deleteOne({ _id: id })
    .then(res.status(200).send({ success: true, message: 'Post Deleted Successfully.'}))
    .catch((error) => {
      res.json({
        message: `${error}`,
      });
    });
  } else {
    res.json({
      message: 'This Post Was Not Found!'
    })
  }
}

module.exports = {
  CreatePost,
  GetPosts,
  UpdatePostPhoto,
  UpdatePostDate,
  UpdatePostTitle,
  UpdatePostContent,
  DeletePost,
};
