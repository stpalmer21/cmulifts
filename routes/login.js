var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'CMU Lifts',
    loggedIn: true,
    nope: req.session.id
  });
});

router.post('/')

module.exports = router;

//
// router.post('/', function(req, res, next) {
//     res.redirect('/')
// });
