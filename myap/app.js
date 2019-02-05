//#1
//var createError = require('http-errors'); 
var express = require('express');
//#2
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//#3
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//#4
//app.set('views', path.join(__dirname, 'views'));
var app = express();
//#5
//var testThing = logger.logRequest();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
