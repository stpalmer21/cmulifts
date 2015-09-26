var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-up', {
    title: 'CMU Lifts',
    loggedIn: true
  });
});

module.exports = router;
