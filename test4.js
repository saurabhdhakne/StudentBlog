const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog');

//find by id and update

Post.findByIdAndUpdate("5d43bb9b0c6cad16086f725f",{
    title: "This is new Title (Update used)"
},(error,posts) => {

    console.log(error,posts) 
})

