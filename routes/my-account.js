var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  age = req.user.age;
  gender = req.user.gender;
  phone = req.user.phone;
  getRender(req, res, next);
});

function getRender(req, res, next) {
  return res.render('my-account', {
    title: 'CMU Lifts',
    loggedIn: req.session.loggedIn,
    path: req.path,
    user: req.user,
  });

  res.render('my-account', {
    title: 'My Account',
    userId: req.session.userId,
    age: req.session.age,
    gender: req.session.gender,
    path: req.path,
    phone: req.session.phone
  });
}

router.post('/', function(req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }

  req.user.age = req.body.age;
  req.user.gender = req.body.gender;
  req.user.phone = req.body.phone;

  req.user.save(function (err) {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    getRender(req, res, next);
  })
});

module.exports = router;
