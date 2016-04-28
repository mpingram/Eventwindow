
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

// DEFAULT MODULES 
var roomObj = new Schema({
	approved: 		{ type: String }
,	approver: 		{ type: String }
, 	timeApproved: 	{ type: Date }

,	room: 			{ type: String, required: true } // enum(rooms);
,	roomSetup: 		{ type: String } // enum(roomOptions)
//, 	roomDiagram: 	{ type: Buffer } // need gridFS?

, 	notes: 			{ type: String}

});

var avObj = new Schema({

});

var cateringObj = new Schema({

});

var parkingObj = new Schema({

});

var custodialObj = new Schema({

});

var marketingObj = new Schema({

});


// overarching event schema, with modules as subdocuments.
var eventSchema = new Schema({

	eventType: 			{ type: String, required: true
						, enum:[
								  'Class'
								, 'Internal_Event'
								, 'External_Event'
								, 'Student_Event'
								, 'RoomTransition'
								, 'Meeting'
						]
					}
,	name: 			{ type: String, required: true }
,	timeStart: 		{ type: Date, required: true }
,   timeEnd: 		{ type: Date, required: true}
, 	numAttending: 	{ type: Number }
    
,   creator: 		{ type: String }
,   creatorEmail: 	{ type: String }
,   organizer: 		{ type: String, required: true }
,   organizerEmail: { type: String }
,   submitted: 		{ type: Date, required: true }

,   approver: 		{ type: String }  // integration with user db?
,   timeApproved: 	{ type: Date }

,   repeating: 		{ type: Boolean, default: false }


// modules ------------------------------
,	roomObj: 		[ roomObj ]
, 	cateringObj: 	[ cateringObj ] 
, 	avObj: 			[ avObj ]
, 	custodialObj: 	[ custodialObj ]
, 	parkingObj: 	[ parkingObj ]

});



    /*
	Type: [Class, Internal_Event, External_Event, Student_Event, RoomTransition, Meeting] -> if (10min gap between 2 events) && (previous event).type==="class" && (current event).type !=="class" show warning "classes may run over, this may not start on time"
Name:
EventID: [--> used as the url → created via hashing function?? how do we avoid hash collision? there'll be a significant number of events. Nope! use the date and a rand maybe
Creator: "userID"
Contact: ["email"] -> does not include Approver or Creator; emails sent to creator and contact if not same.
Submitted: ["dd:mm:yyyy::time"]
Approved: [False/Null, "dd:mm:yy::time"]
Approver: "userID"

Repeating: [False/Null, [how to handle? "weekly","monthly","daily"] -> should generate new events, not repeat this event. Would those events also have "repeating" tag?


			CUSTOM / MODULAR DATA: → adding a form field adds property to event object, adding module adds an object to event object.

Custodial: [Null, Bool]
Marketing: { → MARKETING OBJECT } → all objects should have an "approved" timestamp?
Rooms:[ {  → ROOM OBJECT
Room: ["EI"]
EventRoomName: "name"
Date: "mm:dd:yyyy"
TimeIn: "time"
TimeOut: "time"
NumPeople: int (within room limits?) → how to check max occupancy? Validate in client, validate again in server. Do for all data that needs validation. "Approved" POST requests should only come from admin user.
RoomSetup: ["classroom","lecture"," }, { roomObj } ]  → how to implement in MySQL? → one event has multiple rooms across multiple days. How to handle? → repeating event involving multiple rooms, but only one room repeats. ?
RoomNotes: "long string"
Approved: [False/Null, "dd:mm:yyyy::time"]
l
Parking: [False/Null, → PARKING OBJECT → integration with Jack's thing, offsite parking how to handle? → think re a way to stick a simple web app like jack's parking scheduler here.
 { Space: [1,2,3,4]
   Name:
   TimeIn: "time"
   TimeOut: "time" }
Approved: [False/Null, "dd:mm:yyyy::time"]
Catering: [ → CATERING OBJECT → need to consult existing page to see extent of data required. This is just possibles:
{ Caterer: @string "name"
CatererMeal: @string "name" -> allows for easier updating of catering options 
CatererTimeIn: time
CatererTimeOut: time
CatererNotes: "long string"
COST → estimate given on client side, cost calculated on server side. Prices gotten from server. Would need to talk to carmella to understand more.]
A/V: { → A/V object}

    */

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;