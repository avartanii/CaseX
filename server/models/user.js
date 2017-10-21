var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
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
  employeeID: {
    type: Number,
    required: true,
  },
  permissionLevel: {
    type: String,
    enum: ['Admin', 'Read Only', 'General'],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.middle + ' ' + this.name.last;
});

module.exports = mongoose.model('User', userSchema);
