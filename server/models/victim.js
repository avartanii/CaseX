var mongoose = require('mongoose');

var victimSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Victim', victimSchema);
