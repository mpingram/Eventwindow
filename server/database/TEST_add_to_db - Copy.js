var mongoose =  require('mongoose');
var EventModel = require('./schemas/events');
var moment = require('moment');

var devDb = 'mongodb://localhost/test';

mongoose.connect(devDb);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Database connection successfully opened at ' + devDb);
});


var Event = mongoose.model('Event',EventModel);

// Data to push to db.
var test1 = new Event({
	name:'SSA 401',
	organizer:'TEST',
	timeStart: moment(),
	timeEnd: moment()
});

test1.save(function (err, data){
	if (err) console.log(err);
	else console.log('Saved: '+ data);
});

