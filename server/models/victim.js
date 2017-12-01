const mongoose = require('mongoose');

const victimSchema = new mongoose.Schema({
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
    required: true
  },
  victDesc: {
    type: String
  },
  victAge: {
    type: Number,
    required: true
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

// victimSchema.virtual('name.full').get(() => {
//   return this.victName.first + ' ' + this.victName.middle + ' ' + this.victName.last;
// });

module.exports = mongoose.model('Victim', victimSchema);
