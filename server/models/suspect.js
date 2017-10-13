var mongoose = require('mongoose');

var suspectSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Suspect', suspectSchema);
