const bcrypt = require('bcrypt')

const User = require('../database/models/User')

module.exports = (req,res) => {

    const { email, password } = req.body;

    // try to find user.

    User.findOne({ email }, (error, user) =>{

        if(user){

            //compare password

                bcrypt.compare(password, user.password, (error, same) =>{

                    if(same){

                        // store user session.

                        req.session.userId = user._id
                        // store users id into session  
                        // and that session is encrypted data store into the cookies
 
                        res.redirect('/')

                    }else{
                     
                        res.redirect('/auth/login')
                    
                    }
                })
        }

        else{

            res.redirect('/auth/login')

        }    

    })

    //compare password.  


    // if user password is correct, then, login user.


    //else redirect user back.


}