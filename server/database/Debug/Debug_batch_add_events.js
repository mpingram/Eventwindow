// batch-add-events.js
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var url = "mongodb://localhost/test";


var batch = [	
	{
		"eventName": 		"SSA 442-01"
	,	"eventType":		"Class"
	, 	"repeating": 		true
	, 	"multiroom": 		false
	,	"organizer":		"Parikh, Shipra"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"EI"
				,	"start":		new Date("2016-04-28T09:00:00-05:00")
				,	"end":			new Date("2016-04-28T11:50:00-05:00")
				, 	"numAttending": 	35
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"u_shape"
				, 	"notes": 			"@2016-04-T13:45:43: James Snyder<jssnyder>:\nInstructor requests folding easel and dry erase markers."
			}
		]
	}

, 	{
		"eventName": 		"SSA 563-03"
	,	"eventType":		"Class"
	, 	"repeating": 		true
	, 	"multiroom": 		false
	,	"organizer":		"Samuels, Bryan"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"WII"
				,	"start":		new Date("2016-04-28T09:00:00-05:00")
				,	"end":			new Date("2016-04-28T11:50:00-05:00")
				, 	"numAttending": 	6
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"u_shape"
				, 	"notes": 			null
			}
		]
	}

, 	{
		"eventName": 		"SSA 559-01"
	,	"eventType":		"Class"
	, 	"repeating": 		true
	, 	"multiroom": 		false
	,	"organizer":		"Mosley, Jennifer"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"EII"
				,	"start":		new Date("2016-04-28T09:00:00-05:00")
				,	"end":			new Date("2016-04-28T11:50:00-05:00")
				, 	"numAttending": 	8
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"u_shape"
				, 	"notes": 			null
			}
		]
	}

, 	{
		"eventName": 		"SSA 604-01"
	,	"eventType":		"Class"
	, 	"repeating": 		true
	, 	"multiroom": 		false
	,	"organizer":		"Fugiel, Peter"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"EIII"
				,	"start":		new Date("2016-04-28T09:00:00-05:00")
				,	"end":			new Date("2016-04-28T11:50:00-05:00")
				, 	"numAttending": 	34
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"u_shape"
				, 	"notes": 			null
			}
		]
	}

, 	{
		"eventName": 		"Transgender Workshop"
	,	"eventType":		"Internal Event"
	, 	"repeating": 		false
	, 	"multiroom": 		false
	,	"organizer":		"Rzepenicki, Tina"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"WIb"
				,	"start":		new Date("2016-04-28T09:00:00-05:00")
				,	"end":			new Date("2016-04-28T11:50:00-05:00")
				, 	"numAttending": 	60
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"u_shape"
				, 	"notes": 			"***** Mar 23, 2016 8:57 AM - Snook, Carmella *****\nRoom: Hollow square with seating for 25 people, one classroom table near the windows for catering. Please wipe clean the tables in the morning and clear out any extra chairs.\n***** Mar 17, 2016 12:56 PM - Nagel, Heidi *****\n\nThis room is being switched to accommodate wheel chair"
			}
		]
	}

, 	{
		"eventName": 		"SSA 419-01"
	,	"eventType":		"Class"
	, 	"repeating": 		true
	, 	"multiroom": 		false
	,	"organizer":		"McCracken, Susan"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"WIII"
				,	"start":		new Date("2016-04-28T13:30:00-05:00")
				,	"end":			new Date("2016-04-28T16:20:00-05:00")
				, 	"numAttending": 	30
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"u_shape"
				, 	"notes": 			null
			}
		]
	}

, 	{
		"eventName": 		"SSA 552-01"
	,	"eventType":		"Class"
	, 	"repeating": 		true
	, 	"multiroom": 		false
	,	"organizer":		"Courtney, Mark"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"WIab"
				,	"start":		new Date("2016-04-28T13:30:00-05:00")
				,	"end":			new Date("2016-04-28T16:20:00-05:00")
				, 	"numAttending": 	45
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"default"
				, 	"notes": 			null
			}
		]
	}


, 	{
		"eventName": 		"SSA 443-01"
	,	"eventType":		"Class"
	, 	"repeating": 		true
	, 	"multiroom": 		false
	,	"organizer":		"Ornstein, Eric"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"EIV"
				,	"start":		new Date("2016-04-28T13:30:00-05:00")
				,	"end":			new Date("2016-04-28T16:20:00-05:00")
				, 	"numAttending": 	26
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"default"
				, 	"notes": 			null
			}
		]
	}

, 	{
		"eventName": 		"SSA 658-01"
	,	"eventType":		"Class"
	, 	"repeating": 		true
	, 	"multiroom": 		false
	,	"organizer":		"Stubbs, Matilda"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"EIII"
				,	"start":		new Date("2016-04-28T13:30:00-05:00")
				,	"end":			new Date("2016-04-28T16:20:00-05:00")
				, 	"numAttending": 	30
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"default"
				, 	"notes": 			null
			}
		]
	}

, 	{
		"eventName": 		"Career Toolbox"
	,	"eventType":		"Internal Event"
	, 	"repeating": 		false
	, 	"multiroom": 		true
	, 	"multiroomTotalAttending": 100
	,	"organizer":		"Jorgerst, Michael"
	, 	"organizerEmail":	"bar@foo.com"
	,	"creator":			"mpingram"
	, 	"timeCreated": 		new Date("2016-01-23T09:32:53-05:00")
	,	"creatorEmail": 	"foo@bar.com"
	, 	"approver": 		"mpingram"
	, 	"approved": 		true
	, 	"timeApproved": 	new Date("2016-01-23T09:32:53-05:00")
	, 	"log": 				""


	,	"roomObj": [
			{
					"room": 			"WIV"
				,	"start":		new Date("2016-04-28T13:30:00-05:00")
				,	"end":			new Date("2016-04-28T16:20:00-05:00")
				, 	"subEventName": 	"Job Search"
				, 	"numAttending": 	26
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"classroom"
				, 	"notes": 			null
			}
		,	{
					"room": 			"Lobby"
				,	"start":		new Date("2016-04-30T09:00:00-05:00")
				,	"end":			new Date("2016-04-30T15:30:00-05:00")
				, 	"subEventName": 	"Career Talk"
				, 	"numAttending": 	100
				,	"approved": 		true
				,	"approver": 		"jssnyder"
				, 	"timeApproved": 	new Date("2016-04-24T13:45:43-05:00")
				,	"roomSetup": 		"default"
				, 	"notes": 			null
			}
		]
	}


];

MongoClient.connect(url, function(err, db){
	if (err) {
		console.log(err);
	}
	console.log("connected to server...");
	db.collection("events").insert(batch, function(err, result){
		if (err){
			console.log(err);
		}
		console.log("batch inserted successfully dork. Uhh take a look\n\n\n" + result);
	});
	
});
 