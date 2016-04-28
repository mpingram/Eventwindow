var express = require('express');
var app = express();
var router = express.Router();

var db = require('../../database');
var Events = db.Events;

// asynchronity is going to kill me

router.get('/', function(req,res) {

	var upcomingEvents;

	Events.find(function(err, events){
		if(err) console.log(err);
		upcomingEvents=JSON.stringify(events);
		/*
		upcomingEvents = `[
			{
				'foo':'bar',
				'baz':'sproing'
			},
			{
				'foo':'bear',
				'baz':'sprooooiiiinnng'
			}
		]`;
		*/
		console.log(upcomingEvents);
	})
	.then(
		res.status('200')
			.header('Content-Type','text/plain')
			.send("[{}]")
	);
});

module.exports=router;