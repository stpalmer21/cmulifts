var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'CMU Lifts' });
});

router.post('/loginuser', function(req, res) {
    //res.render('login', { title: "Welcome"});


    console.log(req.body);
    res.redirect('../')
});


module.exports = router;
