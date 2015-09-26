var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('my-account', {
    title: 'CMU Lifts',
    userId: req.session.userId,
    age: req.session.age,
    gender: req.session.gender,
    path: req.path
  });
});

module.exports = router;
