var mongoose = require('mongoose');

var victimSchema = new mongoose.Schema({
  victName: {
    first: {
      type: String,
      required: true
    },
    middle: {
      type: String,
      required: false
    },
    last: {
      type: String,
      required: true
    }
  },
  victSex: {
    type: String,
    enum: ['Male', 'Female', 'Transgender', 'Other', 'Unknown'],
    required: true,
  },
  victDesc: {
    type: String
  },
  victAge: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Victim', victimSchema);
