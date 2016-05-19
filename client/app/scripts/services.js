'use strict';

var emDashServices = angular.module('emDashServices', []);

// factory for fullcalendar initialization with default parameters for dashboard
emDashServices.factory('fc', [function() {

	// service instance to be returned
	var fcService = {};

	// formats event data from server for fc use
	// TODO: more effectively handle repeating events -
	// manage on server side? We could generate a repeatingEvents hash id, and give it to
	// all copies of repeating event. (which would each have a unique mongodb id).
	// --- fc will be reinitialized on page load - so a hash may not be necessary?
	//
	fcService.format = function( dbData ){

		var fcData;

		// helper function which formats one entry at a time
		// TODO: handle multiroom events
		var formatOne = function(data){
			var output = {};

			// getting id
			if (data.repeating === true){
				// TODO: implement!
				// DEBUG: this might be a terrible idea
				//fcData.id = dbData.repeatingID;
				output.id = data._id;

			} else {
				output.id = data._id;
			}

			output.title = 	data.eventName + '\n' + data.organizer;

			// DEBUG: u silly goose, that's not how the data is formatted
			// DEBUG: PATCH JOB.
			// can we modify the fullcalendar source code to allow it to support
			// multi-room events without fuss? (ie, like 'resources' but with ability to specify different times)
			output.start = 	moment(data.roomObject[0].start);
			output.end =	moment(data.roomObject[0].end);
			output.resources = data.roomObject[0].room;

			return output; 
		};




		if (Array.isArray(dbData)){
			fcData = [];

			for (var i=0; i<dbData.length; i++){

				fcData.push( formatOne(dbData[i]));
			}

			return fcData;

		} else if (typeof dbData === 'object'){

			return formatOne(dbData);

		} else {

			throw 'fc.format was fed the wrong thing';
		}
	};

	// initializes fullcalendar with further specific parameters
	// function takes a string argument indicating name of set of specific parameters
	// TODO: separate initialization and event population, to take advantage of the a in ajax.
	fcService.initialize = function( eventsData, parameterSet ){
		// initializes empty fullcalendar instance
		var that = this;

		// stores custom parameters to pass to fullcalendar
		// common params
		// --------------
		var params = {
			resources: [
	                {'id':'EI',         'name':'EI'},
	                {'id':'EII',        'name':'EII'},
	                {'id':'EIII',       'name':'EIII'},
	                {'id':'EIV',        'name':'EIV'},
	                {'id':'WIa',        'name':'WIa'},
	                {'id':'WIb',        'name':'WIb'},
	                {'id':'WII',        'name':'WII'},
	                {'id':'WIII',       'name':'WIII'},
	                {'id':'WIV',        'name':'WIV'},
	                {'id':'Lobby',      'name':'Lobby'},
	                {'id':'Library',    'name':'Library'},
	                {'id':'120',        'name':'120'},
	                {'id':'129',        'name':'129'},
	                {'id':'BW11',       'name':'BW11'},
	                {'id':'BE07',       'name':'BE07'},
	                {'id':'WSSC 052',   'name':'WSSC 052'},
	                {'id':'WSSC 071',   'name':'WSSC 071'},
	                {'id':'CHAS',       'name':'CHAS'}
	        ],
	  
	        minTime: '07:00:00',
	        maxTime: '20:00:00',

	        events: that.format(eventsData),
	        allDaySlot: false,


		};

		// if dashboard environment (DEBUG: or no parameterSet passed)
		if (parameterSet === 'dash' || parameterSet === 'dashboard' || !parameterSet){

			// set resource view
			params.defaultView = 'resourceDay';

			// respond to user click event
			params.eventClick = function(event){

				console.log(event.id);

			};


		}

		$('#calendar').fullCalendar(params);
	};

	return fcService;

}]);

emDashServices.factory('highlightEvent', [function(){

	var output = {};

	output.select = function(eventId, calendarId){

		// shorthand for jQuery fullcalendar call 
		var fc = jQuery(calendarId).fullCalendar;

		// array of fc event objects matching id 
		// -- ie all rooms associated with the event
		var eventRooms = fc('clientEvents', eventId);

		// making sure eventRooms is sorted in order of start time
		if (eventRooms.length > 1){
			eventRooms.sort(function(a, b){
				if (a.start > b.start) {
					return 1;
				} else if (a.start < b.start){
					return -1;
				} else {
					return 0;
				}
			});
		}

		// tell fc to go to day of event
		fc('gotoDate', eventRooms[0].start);

		// TODO: this is where we should implement the logic to deal
		// with corner cases (eg, multiroom events which span multiple days,
		// multiroom repeating events. Although maybe the server will handle
		// that one.)

		// change 'selected' class on all selected eventRooms.
		for (var i=0;i<eventRooms.length;i++){
			// className[1] is reserved for 'selected' class.
			// className[0] (to be) reserved for type ['class', 'externalevent', what have ye]
			eventRooms[i].className[1] = 'selected';
			// rerender the event with the new styling
			fc('renderEvent', eventRooms[i]);
		}

		// TODO: how do we unselect events? do we need to call angular in to watch the class??
		// i can use that $scope.activeEventIds.prev property i was so smart to make...
		// is that fragile? It shouldn't be, bc it selects by element id.... 
	};

	output.unselect = function(eventId, calendarId){
		
	};

	return output;
}]);


// factory for function used by dashboard to acquire events
emDashServices.factory('getEvents', ['$http', function($http){

		return function(startDate, endDate, callback){
			var requestUrl = 'api/events?start=' + startDate + '&end=' + endDate;


            $http({
                method: 'GET',
                url: requestUrl

            }).then(function successCallback(res) {

                callback(res.data);

            }, function errorCallback(res) {
                console.debug(res);
                return 'Response failed!';
            });
		};

}]);

