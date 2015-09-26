var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  req.session.magic = Math.random();
  res.render('login', {
    title: 'CMU Lifts',
    loggedIn: true
  });
});


module.exports = router;

//
// router.post('/', function(req, res, next) {
//     res.redirect('/')
// });
