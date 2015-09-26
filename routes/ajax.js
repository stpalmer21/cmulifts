var express = require('express');
var router = express.Router();
var db = require('../database');
var Response = db.schemas.Response;

function findResponses(response, res, cb) {
  Response.find(response, function (err, responses) {
    if (err) {
      console.error(err);
      return res.send(500);
    }
    cb(responses);
  });
}

function saveResponse(affirmative, req, res) {
  var response = new Response({
    from: req.session.userId,
    to: req.params.toId,
    affirmative: affirmative
  });

  response.save(function (err, response) {
    if (err) {
      console.error(err);
      return res.send(500);
    }

    if (!affirmative) {
      return res.send(200);
    }

    findResponses({
      from: req.params.toId,
      to: req.session.userId,
      affirmative: true
    }, res, function (responses) {
      res.send({
        mutual: responses.length > 0
      });
    });
  });
}

function removeResponse(req, res) {
  var response = new Response({
    from: req.session.userId,
    to: req.params.toId
  });

  findResponses({
    from: req.params.toId,
    to: req.session.userId,
    affirmative: true
  }, res, function (responses) {
    for (var i in responses) {
      responses[i].remove();
    }
    res.send(200);
  });
}

router.post('/accept/:toId', function(req, res, next) {
  return saveResponse(true, req, res);
});

router.delete('/accept/:toId', function(req, res, next) {
  return removeResponse(req, res);
});

router.post('/reject/:toId', function(req, res, next) {
  return saveResponse(false, req, res);
});

router.delete('/reject/:toId', function(req, res, next) {
  return removeResponse(req, res);
});

module.exports = router;
