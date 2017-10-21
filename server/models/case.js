var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({
  drNumber: {
    type: Number,
    required: true,
  },
  masterDrNumber: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    enum: ['Southwest', 'Southeast', '77th Street', 'Harbor'], //
    required: true,
  },
  bureau: {
    type: String,
    enum: ['OSB', 'OCB', 'OWB', 'OVB'],
    required: true
  },
  notes: {
    type: String,
  },
  dateOccured: {
    type: Date,
    required: true,
  },
  dateReported: {
    type: Date,
    required: true,
  },
  reportingDistrict: {
    type: String,
    enum: ['a', 'b', 'c'],
  },
  caseStatus: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  caseStatusDate: {
    type: Date,
    default: Date.now
  },
  solvabilityFactor: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  weaponUsed: {
    type: [String],
    enum: ['handgun', 'blunt force', 'unknown', 'rifle', 'bodily force', 'knife']
  },
  motive: {
    type: [String],
    enum: ['gang', 'unknown', 'robbery', 'narcotics', 'domestic violence',
      'dispute', 'accidental', 'self defense', 'burglary']
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  victim: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Victim',
  },
  address: {
    streetNumber: {
      type: Number,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
  },
  suspects: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Suspect'}]
  }
});

module.exports = mongoose.model('Case', caseSchema);
