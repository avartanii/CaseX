var mongoose = require('mongoose');

var victimSchema = new mongoose.Schema({
  victName: {
    type: String,
    required: true,
  },
  victSex: {
    type: String,
    enum: ['Male', 'Female', 'Transgender', 'Other', 'Unknown'],
    required: true,
  },
  victSupervisedReleaseStatus: {
    type: String,
    enum: ['', ''],
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
