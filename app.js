var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var ajax = require('./routes/ajax');
var users = require('./routes/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var signup = require('./routes/sign-up');
var myaccount = require('./routes/my-account');

var db = require('./database');
var User = db.schemas.User;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.disable('etag'); // Fixes bugs where it gives 304 on dynamic pages

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'WOOHO!'
}));

app.use(function (req, res, next) {
  if (!req.session.loggedIn || !req.session.userId) {
    return next();
  }

  User.find({
    id: req.session.userId
  }, function (err, users) {
    if (err) {
      console.log(err);
      return res.send(500);
    }

    // If we found the user in the database
    if (users.length === 1) {
      // Store there info in the req object
      req.user = users[0];
      next();
    }

    // Otherwise, they have bad login info
    else {
      // Fix the session
      req.session.loggedIn = false;
      delete req.session.userId;
      // Send them to the login page
      res.redirect('/login');
    }
  });
});

app.use('/', routes);
app.use('/ajax', ajax);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/sign-up', signup);
app.use('/my-account', myaccount);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
