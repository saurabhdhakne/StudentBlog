const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/// Schema represent how we are going to structure our collection.
/// Collection represent an entity in application.
/// e.g. if we have user then we have users collection. if we have post then we have post collection
/// Schema is the how the collection look like

const PostSchema = new Schema({
    
    title: String,

    subtitle: String,

    content: String,

    author: {
        
        type: mongoose.Schema.Types.ObjectId,

        ref : 'User',

        required: true
    },

    image: String,

    createdAt: {
        
        type: Date,

        default: new Date()

    }


})


// next we are going to create model itself

 const Post = mongoose.model('Post',PostSchema)

module.exports = Post   