const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog',{
    
useMongoClient: true,


});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

Post.create({

    title : 'My First Blog Post.',

    description : 'First Blog Post Description.',

    content : 'this is First basic conent.'

}, (error, post) => {

      console.log(error, post)

})