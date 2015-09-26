var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.loggedIn = false;
  delete req.session.userId;

  req.user.active = false;
  req.user.save(function(err) {
    if(err) {
      console.error(err);
      return res.send(500);
    }
  });
  delete req.user;

  res.redirect('/');
});

module.exports = router;
