require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const createError = require('http-errors');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var passportRouter = require('./routes/passport');
var signupRouter = require('./routes/signup');  
var postsRouter = require('./routes/posts');

var commentsRouter = require('./routes/comments');  



var app = express();
require('./passport');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// middleware
app.use((req, res, next) => {
    console.log("time:", Date());
    next();
});
// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/passport', passportRouter);
app.use('/api/signup', signupRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

// http errors
app.use((req, res, next) => next(createError(404)));

// error middleware
app.use((err, req, res, next) => {
    if(err.name === 'MongoError' || err.name === 'ValidationError' || err.name === 'CastError'){
        // that means there are some data errors
        err.status = 422;
    }
    if(req.get('accept').includes('json')){
        res.status(err.status || 500).json({message: err.message || "we have some errors eccured."});
    } else {
        res.status(err.status || 500).sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) throw err;
    console.log('elhmdlh connected successfully to server');
});

module.exports = app;
