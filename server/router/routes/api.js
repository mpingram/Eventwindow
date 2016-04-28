var express = require('express');
var app = express();
var router = express.Router();

var db = require('../../database');
var Events = db.Events;



router.get('/', function(req,res) {

	var upcomingEvents;

	Events.find(function(err, events){
		if(err) console.log(err);

		res.status('200')
			.header('Content-Type','application/json')
			.json(events);

		console.log(events);
	});
});

module.exports=router;