var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.loggedIn = true;
  req.session.userId = 'zsnow';

  if(req.session.loggedIn) {
    res.render('search', {
      title: 'CMU Lifts',
      loggedIn: req.session.loggedIn,
      user: req.user
    });
  }
  else {
    res.render('index', {
      title: 'CMU Lifts',
      loggedIn: req.session.loggedIn
    });
  }
});

router.post('/', function(req, res, next) {
  console.log(1);
  console.log(req.body);
  if(req.session.loggedIn) {
    console.log(req.body['gender']);
    req.user.partnerGender = req.body['gender'];
    req.user.experience = req.body['experience'];
    req.user.workoutType = req.body['workoutType'];
    req.user.workoutTime = req.body['workoutTime'];

    req.user.save();
  }
  else {
    res.redirect('/login');
  }
});

module.exports = router;
