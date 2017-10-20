var mongoose = require('mongoose');

var suspectSchema = new mongoose.Schema({
  suspName: {
    type: String,
    required: true,
  },
  suspSex: {
    type: String,
    enum: ['Male', 'Female', 'Transgender', 'Other', 'Unknown'],
    required: true,
  },
  suspAge: {
    type: Number,
    required: true,
  },
  juvenileTriedAsAdult: {
    type: Boolean
  },
  supervisedReleaseStatus: {
    type: String,
    enum: ['parole', 'probation', 'juvenile probation', 'outstanding unrelated warrant']
  }
});

module.exports = mongoose.model('Suspect', suspectSchema);
