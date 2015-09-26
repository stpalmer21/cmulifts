var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.loggedIn = false;
  delete req.user;
  delete req.session.userId;
  res.redirect('/');
});

module.exports = router;
