var moment = require('moment');



var EventGenerator = function(){
	
	// pools
	// ---------------------
	this.firstNamePool = ['Richard', 'Flingus','Sid','Ebenezer', 'Rocky', 'Dontae', 'Margarette', 'Robin', 'Willow', 'Ola', 'Bonnie', 'Nicole', 'Diana', 'Dianna', 'Diananana', 'Michael', 'Jareth'];
	
	this.lastNamePool = ['Nye', 'Hatfield', 'Herring', 'Ingram', 'Lee', 'Li', 'Heaton', 'Cohen', 'Tomlinson', 'Brenner', 'Butler', 'King', 'Morris', 'Bungleton', 'Powerhat', 'Dolphin', 'the Goblin King', 'Goethe', 'Yang', 'Brown', 'Foghorn', 'Colton', 'Dongus'];
	
	this.eventTitlePool = ['Rap', 'Classical Music', 'Sting and the Police', 'Baby', 'Pillow', 'Chromolithograph', 'Men', 'Bath', 'German', 'Grasshopper', 'Peer-to-Peer', 'Forestry', 'Paramedic', 'Hot Doctor', 'Jellyfish', 'Angry Bears', 'Intersectionality', 'Shirt', 'Astronaut', 'Duck', 'Fashion', 'Gentrification', 'Yoga', 'Dance', 'Balloon'];
	
	this.eventSubtitlePool = ['Conference', 'Discussion', 'Lecture', 'Meeting', 'Round Table', 'Viewing', 'Competition', 'Battle', ': an Exploration', 'and the Sorcerer\'s Stone', 'Class', 'Intervention', '-splaining', 'Brunch', 'Coast to Coast', 'Meditation', 'Fight', 'Teleconference', 'Reading', 'Punching', 'Dissection', 'Marathon'];
	
	this.roomPool = ['EI', 'EII', 'EIII','EIV', 'WIa', 'WIb', 'WII', 'WIII', 'WIV', 'Lobby', 'Library', '120', '129'];
	
	this.eventTypePool = ['Class', 'Meeting', 'Internal Event', 'External Event'];
	
	this.roomSetupPool = ['U-shape', 'Hollow Square', 'Classroom', 'Lecture', 'Default'];	
};

EventGenerator.prototype.chooseOne = function(arr){
	// choose one element from array
	
	try {
		return arr[ (Math.random()*arr.length | 0) ];
	} catch (e) {
		console.log(arr);
		console.log(e);
	}	
};

EventGenerator.prototype.randBool = function(weight){
	// returns boolean with weighted probability,
	// with 1 being 10% chance of True and
	// 10 (or above) being 100% chance of True.
	// Accepts floats.
	
	weight = weight || 5;
	var rand = Math.random() + weight/10;
	if (rand>1){
		return true;
	} else {
		return false;
	}
};

EventGenerator.prototype.genEmail = function(name){
	// generates email from name formatted as "Lastname, Firstname".
	try { 
		name = name.split(', ').reverse();
		// first initial
		name[0] = name[0].slice(0,1);
		return name.join('.').split(' ').join('-').toLowerCase() + '@wombo.com';
	}
	catch (e) {
		console.log(e);
		throw 'Exception due to ' + name;
	}
};

EventGenerator.prototype.genName = function(type){
	// generates names of people or events
	// by randomly combining name pools.
	
	type = type || 'person';
	
	
	if (type === 'person'){
		var firstname = this.chooseOne(this.firstNamePool);
		var lastname = this.chooseOne(this.lastNamePool);
		
		return lastname + ', ' + firstname;
		
	} else if (type === 'event'){
		var title = this.chooseOne(this.eventTitlePool);
		var subtitle = this.chooseOne(this.eventSubtitlePool);
		
		return title + ' ' + subtitle;
		
	} else {
		throw 'Wrong parameter \n@ EventGenerator.prototype.getName(type)';
	}
};

// TODO: clean up / fix
EventGenerator.prototype.genRoomObject = function(usedRooms){

	usedRooms = usedRooms || [];
	
	var that = this;
	var output = [];
	var room;
	
	// creates one room obj, with a 10% chance of creating another each iteration.
	do {
		
		// randomly assign room and make sure it hasn't already been used (in case of multiroom events)
		do {
			// assign room
			room = this.chooseOne(this.roomPool);

		// if room is in usedRooms (index is not -1), do again
		// if room isn't in usedRooms, loop terminates and we continue
		} while (usedRooms.indexOf(room) !== -1);
		
		
		// pushes room obj to output array
		output.push(
			{
				room: 					that.chooseOne(that.roomPool),
				numAttending: 			Math.random()*100 | 0,
				approver:				that.genName(),
				roomSetup: 				that.chooseOne(that.roomSetupPool)
			}
			
		);
		
		// add room to usedRooms, it's been compromised
		usedRooms.push(room);
		
	// 10% chance of generating another room object
	} while(this.randBool(1) === true);
	
	// return array of all rooms
	return output;	
};

// TOOD: check against data client is expecting
EventGenerator.prototype.generate = function(){

	var e = {};

	e.eventName = 			this.genName('event');
	e.eventType = 			this.chooseOne(this.eventTypePool);
	e.repeating = 			this.randBool(7);
	e.multiroom = 			this.randBool(1);
	e.organizer = 			this.genName();
	e.organizerEmail = 		this.genEmail(e.organizer);
	e.creator = 			this.genName();
	e.creatorEmail = 		this.genEmail(e.creator);

	e.eventStart = 			null;
	
	return e;
};

// TODO: fix
EventGenerator.prototype.run= function(startDate, endDate) {
	// Main entry point for program.
	// ============================
	
	// parameter initialization
	// --------------------------
	
	startDate = startDate || moment();

	if (!endDate){
		endDate = moment(startDate);
		endDate.add(2, 'months');
	}

	var output = [];
	
	// for loop increments date by 5 hours
	for (var i = moment(startDate); i < endDate; i.add(5, 'hours') ) {
		
		// first timeslot
		// -----------------------------
		var start = moment(i);
		var end = moment(i).add(3, 'hours');
		
		// stores rooms in use for each timeslot
		var usedRooms = [];
		
		// generating events for first timeslot
		do {
			
			var event = this.generate();
			
			event.roomObject = this.genRoomObject();
			
			for (var k = 0; k < event.roomObject.length; k++){
				
				// set each room obj's start and end timegen
				event.roomObject[k].start = start;
				event.roomObject[k].end = end;
				
				var counter = 0;
				// if there are collisions, try again and increment the collision counter
				while (usedRooms.indexOf (event.roomObject[k].room) !== -1 && counter < 50){
					
					event.roomObject[k].room = this.chooseOne(this.roomPool);
					counter++;
					
				}
				
				
				// remember which rooms have been used
				usedRooms.push(event.roomObject[k].room);
			}
			
			// add event to final array 
			output.push(event);
			
		// repeat for however long
		} while( this.randBool(9.5));
	}

	return output;
};




module.exports = EventGenerator;

	

