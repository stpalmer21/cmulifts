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
  },
  search_time: {
    type: Date
  },
  partnerGender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Any']
  },
  experience: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Expert']
  },
  workoutType: {
    type: String,
    enum: ['Running', 'Lifting', 'Bicycling']
  },
  workoutTime: {
    type: String,
    enum: ['Now', 'In fifteen minutes', 'In half an hour', 'In an hour', 'In a couple of hours']
  }
});

var responseSchema = mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  affirmative: {
    type: Boolean,
    required: true
  }
});

var User = mongoose.model('User', userSchema);
var Response = mongoose.model('Response', responseSchema);

db.schemas = {
  User: User,
  Response: Response
};

module.exports = db;
