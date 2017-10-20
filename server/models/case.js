var mongoose = require('mongoose');
// var User = require('../models/user');
// var Victim = require('../models/victim');
// var Address = require('../models/address');
// var Suspect = require('../models/suspect');

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
  },
  caseStatusDate: {
    type: Date,
  },
  solvabilityFactor: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  weaponUsed: {
    type: String,
    enum: ['handgun', 'blunt force', '']
  },
  motive: {
    type: String,
    enum: ['', '']
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
  },
  // lastModifiedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  victim: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Victim',
  },
  // address: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Address',
  // },
  // suspects: {
  //   type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Suspect'}]
  // }
});

module.exports = mongoose.model('Case', caseSchema);
