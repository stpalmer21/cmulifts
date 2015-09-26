var mongoose = require('mongoose');

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
  phone: {
    type: String,
    required: true,
    default: "11234567890"
  },
  searchTime: {
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
    enum: ['Running', 'Lifting', 'Bicycling', 'Any']
  },
  workoutTime: {
    type: String,
    enum: ['Any', 'Now', 'In fifteen minutes', 'In half an hour', 'In an hour', 'In a couple of hours']
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
