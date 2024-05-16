
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var json = require('express');
// var urlencoded = require('express');
// var static  = require('express');

// var join = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var serializeUser = require('./routes/users');
// var deserializeUser = require('./routes/users');

// var initialize = require('passport');
// var session = require('passport');
// var serializeUser = require('passport');
// var deserializeUser = require('passport');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret:'hihello'
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());


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
