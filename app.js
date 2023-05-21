var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var articlesRouter = require('./routes/articles');
var commentairesRouter = require('./routes/commentaires');
var categoriesRouter = require('./routes/categories');

const authMiddleware = require("./middleware/authMiddleware");



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', authRouter);
app.use("/",authMiddleware);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/commentaires', commentairesRouter);
app.use('/categories', categoriesRouter);





module.exports = app;
