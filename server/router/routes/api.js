var express = require('express');
var app = express();
var router = express.Router();


router.get('/', function(req,res) {

	/*
    var upcomingEventsCursor = Events.find( {}, {name:1, organizer:1,timeStart:1, timeEnd:1} ).limit(50).sort({timeStart:1});
    var upcomingEvents = upcomingEventsCursor.forEach(printjson);
    console.log(upcomingEvents);
	*/

	var upcomingEvents = [{
	    	'name':'Foo',
	    	'organizer':'Bar'
	    },
	    {
	    	'name':'Baz',
	    	'organizer':'Sprong'
    }];
    
    res.status(200).json([
        JSON.stringify(upcomingEvents)
    ]);


});

module.exports=router;