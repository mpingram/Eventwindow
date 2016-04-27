var express = require('express');
var app = express();
var router = express.Router();

var db = require('../../database');
var Events = db.Events;


router.get('/', function(req,res) {

	var upcomingEvents;

	Events.find(function(err, events){
		if (err) return console.error(err);
		console.log(events);
		upcomingEvents = events;
	});
	
    res.status(200).json(upcomingEvents);
});

module.exports=router;