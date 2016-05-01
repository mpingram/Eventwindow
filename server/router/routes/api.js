var express = require('express');
var router = express.Router();

var db = require('../../database');
var events = db.events;



router.get('/', function(req,res) {


	events.find( function(err, events) {

		if(err) {
			console.log(err);
		}

		res.status('200')
			.header('Content-Type','application/json')
			.json(events);

		console.log(events);
	});
});

module.exports=router;