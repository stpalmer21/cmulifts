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
var signup = require('./routes/sign-up');

var db = require('./database');
var User = db.schemas.User;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'WOOHO!' }));

app.use(function(req, res, next) {
  if(req.session.loggedIn) {
    User.find({id: req.session.userId}, function(err, users) {
      if(err) {
        console.log(err);
        res.send(500);
      }

      if(users.length === 0) {
        req.session.loggedIn = false;
        res.redirect('/login');
      }
      else {
        req.user = users[0];
      }

      next();
    });
  } else {
    next();
  }
});

app.use('/', routes);
app.use('/ajax', ajax);
app.use('/users', users);
app.use('/login', login);
app.use('/sign-up', signup);

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
