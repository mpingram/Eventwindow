var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../../../database');
var events = db.events;

// GET api/events?start=<unix timestamp>&end=<unix timestamp>
router.get('/', function(req,res) {



	// parse query strings as unix timestamps ('X')
	var startDate = moment(req.query.start, 'X');
	var endDate = moment(req.query.end, 'X');
	// we only really wanted the days
	startDate = startDate.startOf('day');
	endDate = endDate.startOf('day');


	// TODO: implement reverse search (endDate comes before startdate)
	// helper function which searches the db for our event data
	var findEvents = function(start, end, callback){

		var cursor = db.collection('events').find( {} , {'sort': ['eventStart', 'asc'] }, 
			function(err, upcomingEvents){
				if (err) {
					console.log(err);
				} else {
					console.log(upcomingEvents);	
				}
			}
		);
	};



	// checking to make sure start and end dates are formatted right
	if ( !startDate.isValid() || !endDate.isValid() ) {

		res.status('404')
			.send('Invalid query format.');

	} else {

		events.find( {} , {}, {'sort':'eventStart'}, function(err, upcomingEvents) {

			if(err) {
				console.log(err);
			}

			res.status('200')
				.header('Content-Type','application/json')
				.json(upcomingEvents);
		});
	}
});

module.exports=router;