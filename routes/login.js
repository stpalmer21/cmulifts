var express = require('express');
var router = express.Router();
var db = require('../database');
var User = db.schemas.User;

/* GET login page. */
router.get('/', function(req, res, next) {

  res.render('login', {
    title: 'CMU Lifts',
  });
});

router.post('/', function(req, res, next) {
  User.find({
    id: req.params.id
  }, function (err, users) {
    if (err) {
      console.error();(err);
      return res.send(500);
    }

    if (users.length > 0) {
      req.session.id = req.params.id;
      req.session.loggedIn = true;
      res.redirect('/search/');
    } else {
      res.render('login', {
        title: 'CMU Lifts',
        notFound: true,
      });
    }
  })
});



router.post('/')

module.exports = router;

//
// router.post('/', function(req, res, next) {
//     res.redirect('/')
// });
