var mongoose =  require("mongoose");
var EventModel = require("./schemas/events");
//var moment = require("moment");

mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback () {
	console.log("Database connection successfully opened." );
});


var Event = mongoose.model("Event", EventModel);

// Data to push to db.
var test1 = new Event({
		"eventName": 		"SSA 442-01"
	,	"eventType":		"Class"
	, 	"totalAttending": 	35
	, 	"repeating": 		true
	, 	"multiroom": 		false
	,	"organizer":		"Parikh, Shipra"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		"2016-01-23T09:32:53-05:00"
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	"2016-01-23T09:32:53-05:00"
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"EI"
				,	"timeStart":		"2016-04-28T09:00:00-05:00"
				,	"timeEnd":			"2016-04-28T11:50:00-05:00"
				, 	"numAttending": 	35
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	"2016-04-24T13:45:43-05:00"
				,	"roomSetup": 		"u_shape"
				, 	"notes": 			"@2016-04-T13:45:43: James Snyder<jssnyder>:\nInstructor requests folding easel and dry erase markers."
			}
		]
	});

test1.save(function (err, data){
	if (err) { 
		console.log(err);
	} else {
		console.log("Saved: "+ data);
	}
});

