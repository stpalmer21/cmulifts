var express = require('express');
var router = express.Router();

var db = require('../database');
var User = db.schemas.User;

function searchPage(req, res, next) {
  return res.render('search', {
    title: 'CMU Lifts',
    loggedIn: req.session.loggedIn,
    user: req.user
  });
}

function homePage(req, res, next) {
  res.render('index', {
    title: 'CMU Lifts',
    loggedIn: req.session.loggedIn
  });
}

function browsePage(req, res, next) {
  User.find({active: true}, function(err, users) {
    if (err) {
      console.log(err);
      return res.send(500);
    }

    var filteredUsers = users.filter(function (user) {
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

/* GET home page. */
router.get('/', function(req, res, next) {
  // If the user is not logged in
  if (!req.session.loggedIn || !req.user) {
    // Render the homepage
    return homePage(req, res, next);
  }

  // If the user is not already active
  if (!req.user.active) {
    // Render the search page
    return searchPage(req, res, next);
  }

  // Othersise, show the browse page
  browsePage(req, res, next);
});

router.post('/', function (req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }

  // Update the users info
  req.user.partnerGender = req.body.partnerGender;
  req.user.experience = req.body.experience;
  req.user.workoutType = req.body.workoutType;
  req.user.workoutTime = req.body.workoutTime;
  req.user.searchTime = Date.now();
  req.user.active = true;

  // Save it all in the database
  req.user.save(function (err) {
    if (err) {
      console.error(err);
      return res.send(500);
    }
    // Redirect pack to the home page (which will now be the browse page)
    res.redirect('/');
  });
});

module.exports = router;
