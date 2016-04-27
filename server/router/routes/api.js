var express = require('express');
var app = express();
var router = express.Router();

var db = require('../../database');
//var Events = db.Events;


router.get('/', function(req,res) {

	console.log('im trying');

    var upcomingEvents = db.Events.find( {}, {_id:1, name:1, organizer:1,timeStart:1, timeEnd:1} )/*.toArray()*/;
    console.log('...');


    //var upcomingEvents = upcomingEventsCursor.toArray();
    console.log('am i really trying?');

    console.log(upcomingEvents);
	
	/*
	var upcomingEvents = [{
	    	'name':'Foo',
	    	'organizer':'Bar'
	    },
	    {
	    	'name':'Baz',
	    	'organizer':'Sprong'
    }];
	*/
	
    res.status(200).json([
        JSON.stringify(upcomingEvents)
    ]);


});

module.exports=router;