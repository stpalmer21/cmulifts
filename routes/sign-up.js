var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-up', {
    title: 'CMU Lifts',
    path: req.path,
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;
