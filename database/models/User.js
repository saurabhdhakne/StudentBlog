const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username : {

        type : String,

        required : [true,  'Please provide your username'], 

        unique : true
    },

    email : {
        
        type : String,

        required : [ true, 'Please Provide Your email' ],

        unique : true
    },

    password : {
        type : String,

        required : [ true, 'Please Provide Your password' ],

        unique : true
    }
})


// before saving any record perform following function 
UserSchema.pre('save', function(next){

    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted){

        user.password = encrypted

        next()
    })


})


module.exports = mongoose.model('User', UserSchema)