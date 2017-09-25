var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({
  drNum: {
    type: Number,
    required: true
  },
  masterDrNum: {
    type: Number,
    required: true
  },
  division: {
    type: String,
    enum: ['Northwest', 'Northeast'],
    required: true
  },
  bureau: {
    type: String
  },
  victim: {
    type: String
  },
  notes: {
    type: String
  },
});

module.exports = mongoose.model('Case', caseSchema);
