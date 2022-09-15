const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogPostSchema = new Schema ({
    blogPicture: {
        type: String
    },
    blogDate: {
        type: String
    },
    blogTitle: {
        type: String
    },
    blogContent: {
        type: String
    }
}, {timestamps: true})

const BlogPost = mongoose.model('blog_post', blogPostSchema)

module.exports = BlogPost