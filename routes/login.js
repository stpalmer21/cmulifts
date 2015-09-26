var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {

  res.render('login', {
    title: 'CMU Lifts',
    loggedIn: true,
    loggedIn: req.session.loggedIn
  });

  if(req.session.loggedIn) {
    res.render('search', {
      title: 'CMU Lifts',
      loggedIn: req.session.loggedIn
    });
  }

});




router.post('/')

module.exports = router;

//
// router.post('/', function(req, res, next) {
//     res.redirect('/')
// });
