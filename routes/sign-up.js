var express = require('express');
var router = express.Router();
var db = require('../database');
var User = db.schemas.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-up', {
    title: 'Sign up',
    path: req.path,
    loggedIn: req.session.loggedIn
  });
});

router.post('/', function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err) {
    if (err) {
      console.error(err);
      return res.send(500);
    }
    res.redirect('/login');
  });
});

module.exports = router;
