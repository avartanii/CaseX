var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Address', addressSchema);
