var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true,
    default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  }
});

var yesSchema = mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', userSchema);
var Yes = mongoose.model('Yes', yesSchema);

db.schemas = {
  User: User,
  Yes: Yes
};

module.exports = db;
