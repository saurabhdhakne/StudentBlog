require('dotenv').config();

const express = require('express');

const path = require('path');

const expressEdge = require('express-edge');

const edge = require('edge.js')

const cloudanary = require('cloudinary');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const Post = require('./database/models/Post');

const fileUpload = require('express-fileupload');

const expressSession = require('express-session');

const connectMongo = require('connect-mongo');

const connectFlash = require('connect-flash');


const getPostController = require('./Controllers/getPost');

const homePageController = require('./Controllers/homePage');

const storePostController = require('./Controllers/storePost');

const createPostController = require('./Controllers/createPost');

const createUserController = require('./Controllers/createUser');

const storeUserController = require('./Controllers/storeUser');

const loginController = require('./Controllers/login');

const loginUserController = require('./Controllers/loginUser');

const logoutController = require('./Controllers/logout');

const app = new express();


mongoose.connect(process.env.DB_URI);

app.use(connectFlash());


cloudanary.config({

    api_key: process.env.CLOUDINARY_API_KEY,

    api_secret: process.env.CLOUDINARY_API_SECRETE,

    cloud_name: process.env.CLOUDINARY_NAME,

})


const mongoStore = connectMongo(expressSession);



app.use(expressSession({

    secret: process.env.EXPRESS_SESSION_KEY,
    store : new mongoStore({
        mongooseConnection: mongoose.connection 
    }),
    resave: true,
    saveUninitialized: true
    
}))

app.use(express.static('public'));

app.use(expressEdge);

app.use(fileUpload());

app.set('views',`${__dirname}/views`);

app.use('*', (req, res, next) =>{

    //using the edge templeting engine global variable called auth should be availabe on all
    // the pages called by edge templating engine.

    edge.global('auth', req.session.userId)

    next()

})

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

const storePost = require('./middleware/storePost');

const auth = require('./middleware/auth'); 

const redirectIfAuthenticated = require('./middleware/redirectifAuthenticated');

app.get('/',homePageController);

app.get('/post/:id', getPostController);

app.get('/posts/new', auth, createPostController);

app.post('/posts/store', auth, storePost,  storePostController);
 
app.get('/auth/login', redirectIfAuthenticated, loginController);

app.get('/auth/logout', auth, logoutController);

app.get('/auth/register', redirectIfAuthenticated, createUserController);

app.post('/users/register', redirectIfAuthenticated, storeUserController);

app.post('/users/login', redirectIfAuthenticated, loginUserController);

app.use((req, res) => res.render('not-found'));

app.get('/contact',(req,res) => {

    res.render('contact');
});

app.get('/about',(req,res) => { 

    res.render('about');
});


app.listen(process.env.PORT, () => {

    console.log(`App listening on port ${process.env.PORT}`);

});