var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.loggedIn = false;
  delete req.session.userId;

  if (req.user) {
    req.user.active = false;
    req.user.save(function(err) {
      if(err) {
        console.error(err);
        return res.send(500);
      }
      delete req.user;
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
