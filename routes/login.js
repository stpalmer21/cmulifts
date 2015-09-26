var express = require('express');
var router = express.Router();
var db = require('../database');
var User = db.schemas.User;

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'CMU Lifts',
  });
});

router.post('/', function(req, res, next) {
  User.find({
    id: req.body.userId
  }, function (err, users) {
    if (err) {
      console.error(err);
      return res.send(500);
    }

    if (users.length > 0) {
      req.session.userId = req.body.userId;
      req.session.loggedIn = true;
      res.redirect('/search/');
    } else {
      res.render('login', {
        title: 'CMU Lifts',
        notFound: true,
      });
    }
  });
});

module.exports = router;
