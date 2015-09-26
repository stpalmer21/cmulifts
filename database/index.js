var mongoose = require('mongoose');

var socketOptions = {
  keepAlive: 1
};

var options = {
  server: {
    socketOptions: socketOptions,
    poolSize: 5
  },
  replset: {
    socketOptions: socketOptions
  }
};

mongoose.connect('mongodb://localhost/', options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var User = require('./user');
var Response = require('./response');

db.schemas = {
  User: User,
  Response: Response
};

module.exports = db;
