var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'CMU Lifts',
    loggedIn: true,
    magic: req.session.magic
  });
});

module.exports = router;
