const express = require('express');
const router = express.Router();

const BlogPostController = require('../controllers/BlogPostController')

router.post('/blog_posts', BlogPostController.CreatePost)
router.get('/blog_posts', BlogPostController.GetPosts)
router.patch('/blog_posts/photo/:postID', BlogPostController.UpdatePostPhoto)
router.patch('/blog_posts/date/:postID', BlogPostController.UpdatePostDate)
router.patch('/blog_posts/title/:postID', BlogPostController.UpdatePostTitle)
router.patch('/blog_posts/content/:postID', BlogPostController.UpdatePostContent)
router.delete('/blog_posts/:postID', BlogPostController.DeletePost)

module.exports = router;