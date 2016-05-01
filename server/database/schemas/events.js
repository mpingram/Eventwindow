
var mongoose = require('mongoose');
//var moment = require('moment');
var Schema = mongoose.Schema;

// subdocmument of rooms used for events
// TODO: big question: does A/V and catering belong tied to rooms or to events?
var roomSchema = new Schema({

	room: 			{ type: String, required: true} // enum(rooms)
,	timeStart: 		{ type: Date, required: true}
,	timeEnd: 		{ type: Date, required: true}
, 	numAttending: 	{ type: Number}

, 	subEventName: 	{ type: String }
, 	approved: 		{ type: Boolean }
,	approver: 		{ type: String }
, 	timeApproved: 	{ type: Date }
, 	roomSetup: 		{ type: String, default: 'default'}
, 	notes: 			{ type: String}

});

// overarching event schema, with modules as subdocuments.
var eventSchema = new Schema({

	eventName: 		{ type: String, required: true }
,	eventType: 		{ 	type: String, required: true
					, enum:[
							'Class'
						,	'Internal_Event'
						,	'External_Event'
						,	'Student_Event'
						,	'RoomTransition'
						,	'Meeting'
						]
					}

	// debate: replace totalAttending with multiroomTotalAttending
,   repeating: 		{ type: Boolean, default: false }
, 	multiroom: 		{ type: Boolean, default: false }
, 	multiroomTotalAttending: { type: Number }

,   organizer: 		{ type: String, required: true }
,   organizerEmail: { type: String }

,   creator: 		{ type: String }
,   timeCreated: 	{ type: Date, required: true }
,   creatorEmail: 	{ type: String }

,   approver: 		{ type: String }  // integration with user db?
, 	approved: 		{ type: Boolean }
,   timeApproved: 	{ type: Date }
, 	log: 			{ type: String } // Buffer?




// modules ------------------------------

,	roomObj: 		[roomSchema]
/*
, 	cateringObj: 	{}
, 	avObj: 			{}
, 	custodialObj: 	{}
, 	parkingObj: 	{}
, 	marketingObj: 	{}
, 	accessObj: 		{}
*/
});

// the mongoDb collection associated with the Event model
var collectionName = 'events';

// creating the constructor for new events.
var Event = mongoose.model('Event', eventSchema, collectionName);

module.exports = Event;