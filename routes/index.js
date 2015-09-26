var express = require('express');
var router = express.Router();

Array.prototype.contains = function (obj) {
  for (var i in this) {
    var element = this[i];
    if (element === obj) {
      return true;
    }
  }
  return false;
};

var db = require('../database');
var User = db.schemas.User;
var Response = db.schemas.Response;

function searchPage(req, res, next) {
  return res.render('search', {
    title: 'CMU Lifts',
    loggedIn: req.session.loggedIn,
    user: req.user
  });
}

function homePage(req, res, next) {
  res.render('index', {
    title: 'CMU Lifts',
    loggedIn: req.session.loggedIn
  });
}

function getReferencingResponses(userId, res, cb) {
  Response.find([{
    from: userId
  }, {
    to: userId
  }], function (err, responses) {
    if (err) {
      console.log(err);
      return res.send(500);
    }

    var obj = {
      rejected: [],
      accepted: [],
      rejectedBy: [],
      acceptedBy: []
    };

    for (var i in responses) {
      var response = responses[i];
      if (response.from === userId) {
        if (response.affirmative) {
          obj.accepted.push(response.to);
        } else {
          obj.rejected.push(response.to);
        }
      } else {
        if (response.affirmative) {
          obj.acceptedBy.push(response.from);
        } else {
          obj.rejectedBy.push(response.from);
        }
      }
    }

    cb(obj);
  });
}

function browsePage(req, res, next) {
  User.find({active: true}, function (err, users) {
    if (err) {
      console.log(err);
      return res.send(500);
    }

    getReferencingResponses(req.user.id, res, function (responses) {
      var filteredUsers = users.filter(function (user) {
        var isSomeoneElse = user.id !== req.session.userId;
        var partnerAcceptsGender = user.partnerGender === 'Any' || user.partnerGender === req.user.gender;
        var youAcceptGender = req.user.partnerGender === 'Any' || req.user.partnerGender === user.gender;

        var alreadyResponded = responses.accepted.contains(user.id) || responses.rejected.contains(user.id);
        var rejectedYou = responses.rejectedBy.contains(req.user.id);
        var acceptedYou = responses.acceptedBy.contains(req.user.id);
        var canRespond = !alreadyResponded && !rejectedYou;

        return isSomeoneElse && partnerAcceptsGender && youAcceptGender && canRespond;
      });
      //TODO: sort with those who accepted you at start
      //TODO: better sorting based on criteria including gender, etc.

      res.render('browse', {
        title: 'CMU Lifts',
        loggedIn: req.session.loggedIn,
        user: req.user,
        users: filteredUsers
      });
    });
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // If the user is not logged in
  if (!req.session.loggedIn || !req.user) {
    // Render the homepage
    return homePage(req, res, next);
  }

  // If the user is not already active
  if (!req.user.active) {
    // Render the search page
    return searchPage(req, res, next);
  }

  // Othersise, show the browse page
  browsePage(req, res, next);
});

router.post('/', function (req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }

  // Update the users info
  req.user.partnerGender = req.body.partnerGender;
  req.user.experience = req.body.experience;
  req.user.workoutType = req.body.workoutType;
  req.user.workoutTime = req.body.workoutTime;
  req.user.searchTime = Date.now();
  req.user.active = true;

  // Save it all in the database
  req.user.save(function (err) {
    if (err) {
      console.error(err);
      return res.send(500);
    }
    // Redirect pack to the home page (which will now be the browse page)
    res.redirect('/');
  });
});

router.get('/exitQueue',  function (req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect('/');
  }

  req.user.active = false;
  req.user.save(function (err) {
    if (err) {
      console.error(err);
      return res.send(500);
    }
    // Redirect pack to the home page (the search page)
    res.redirect('/');
  });
});

module.exports = router;
