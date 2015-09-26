var express = require('express');
var router = express.Router();

var db = require('../database');
var User = db.schemas.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn) {
    if(!req.user.active) {
      res.render('search', {
        title: 'CMU Lifts',
        loggedIn: req.session.loggedIn,
        user: req.user
      });
    }
    else {
      var filteredUsers;
      User.find({active: true}, function(err, users) {
        if(err) {
          console.log(err);
          return res.send(500);
        }

        filteredUsers = users.filter(function (user) {
          return user.id !== req.session.userId;
        });
        //TODO: remove those who have rejected you
        //TODO: sort with those who accepted you at start
        //TODO: better sorting based on criteria including gender, etc.

        res.render('browse', {
          title: 'CMU Lifts',
          loggedIn: req.session.loggedIn,
          user: req.user,
          users: filteredUsers
        });
      });
    }
  }
  else {
    res.render('index', {
      title: 'CMU Lifts',
      loggedIn: req.session.loggedIn
    });
  }
});

router.post('/', function(req, res, next) {
  if(req.session.loggedIn) {
    req.user.partnerGender = req.body['gender'];
    req.user.experience = req.body['experience'];
    req.user.workoutType = req.body['workoutType'];
    req.user.workoutTime = req.body['workoutTime'];
    req.user.searchTime = Date.now();
    req.user.active = true;

    req.user.save(function(err) {
      if(err) {
        console.error(err);
        res.send(500);
      }
      else {
        res.redirect('/');
      }
    });
  }
  else {
    res.redirect('/login');
  }
});

module.exports = router;
