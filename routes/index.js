var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn) {
    res.render('search', {
      title: 'CMU Lifts',
      loggedIn: req.session.loggedIn
    });
  }
  else {
    res.render('index', {
      title: 'CMU Lifts',
      loggedIn: req.session.loggedIn
    });
  }
});

module.exports = router;
