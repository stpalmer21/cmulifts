var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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
        res.redirect('/'); //TODO: Next step
      }
    });
  }
  else {
    res.redirect('/login');
  }
});

module.exports = router;
