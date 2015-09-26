var mongoose = require('mongoose');

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

var Response = mongoose.model('Response', responseSchema);

module.exports = Response;
