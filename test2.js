const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog');


Post.find({
    title: "My First Blog Post."
},(error,posts) => {

    console.log(error,posts) 
})

