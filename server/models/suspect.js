/* eslint comma-dangle: "off" */
const mongoose = require('mongoose');

const suspectSchema = new mongoose.Schema({
  suspName: {
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
    // 'unknown', 'none', 'parole', 'probation', 'juvenile probation', 'felony warrant separate incident'
  },
  suspDesc: {
    type: String
  }
});

module.exports = mongoose.model('Suspect', suspectSchema);
