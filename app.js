var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors')
const usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var articlesRouter = require('./routes/articles');
var commentairesRouter = require('./routes/commentaires');
var categoriesRouter = require('./routes/categories');

const authMiddleware = require("./middleware/authMiddleware");



var app = express();

app.use( cors({
    origin: "http://localhost:8081",
  }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', authRouter);
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use("/",authMiddleware);
app.use('/users', usersRouter);
app.use('/commentaires', commentairesRouter);





module.exports = app;
