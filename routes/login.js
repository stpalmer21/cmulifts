var express = require('express');
var router = express.Router();
var db = require('../database');
var User = db.schemas.User;

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Login',
  });
});

/* POST login page. */
router.post('/', function(req, res, next) {
  function loginFailed() {
    res.render('login', {
      title: 'Login',
      notFound: true,
    });
  }

  // If anything is missing
  if (!req.body || !req.body.userId || req.body.password === '') {
    // Back to the login page
    loginFailed();
  }

  // Find all users with this userId
  User.find({
    id: req.body.userId
  }, function (err, users) {
    if (err) {
      console.error(err);
      return res.send(500);
    }

    // If the user exists
    if (users.length > 0) {
      // Store the info in the session
      req.session.userId = req.body.userId;
      req.session.loggedIn = true;
      // Redirect to the home page
      res.redirect('/');
    } else {
      // Back to the login page
      loginFailed();
    }
  });
});

module.exports = router;
