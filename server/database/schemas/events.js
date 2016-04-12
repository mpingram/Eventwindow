
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

// EVENTS schema for mdb.
var eventSchema = new Schema({
    name: { type: String, required: true },
    organizer: { type: String, required: false },
    timeStart: { type: Date, required: true },
    timeEnd: {type: Date, required: true},
    useless: {type: String, required: false }
});


var Events = mongoose.model('Event', userSchema);

module.exports = Events;