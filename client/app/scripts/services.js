'use strict';


// DEBUG: if using resource, need to add 'ngResource' back to dependencies
var emDashServices = angular.module('emDashServices', []);



// factory for fullcalendar initialization with default parameters for dashboard
emDashServices.factory('fc', function() {

	// service instance to be returned
	var fcService = {};

	// formats event data from server for fc use
	// TODO: more effectively handle repeating events -
	// manage on server side? We could generate a repeatingEvents hash id, and give it to
	// all copies of repeating event. (which would each have a unique mongodb id).
	// --- fc will be reinitialized on page load - so a hash may not be necessary?
	//
	// DEBUG: consequence of this being inside fc is that fc will need to be injected
	// whenever you need to format data for fc. That sounds like it should be fine, right?
	fcService.format = function( dbData ){
		var fcData = {};

		// getting id
		if (dbData.repeating === true){
			// TODO: implement!
			// DEBUG: this might be a terrible idea
			//fcData.id = dbData.repeatingID;
			fcData.id = dbData._id;

		} else {
			fcData.id = dbData._id;
		}

		// DEBUG: is this how jack did it?
		fcData.title = 	dbData.name + "\n" + dbData.organizer;

		fcData.start = 	dbData.start;
		fcData.end =	dbData.end;

		// DEBUG: alternately, respond to onclick event hook
		fcData.url = 	'events/' + dbData._id;

		return fcData;
	};

	// initializes fullcalendar with further specific parameters
	// function takes a string argument indicating name of set of specific parameters
	fcService.initialize = function( eventBuffer, parameterSet ){

		var that = this;

		// DEBUG:
		// woah woah woah now, this won't work cowboy. Need to iterate over object the way format is wired rn.
		// OR JUST SYNCHRONIZE THE DATABASE AND THE FULLCALENDAR VIEW. UGHHHHHHHHH
		//eventBuffer = this.format(eventBuffer);

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

	        // TODO: fix this bs
	        // should function here handle logic that if events aren't in eventbuffer, pull data from server?
	        events: [ that.format(eventBuffer[0]) ]
	        


		};

		// if dashboard environment (DEBUG: or no parameterSet passed)
		if (parameterSet === 'dash' || parameterSet === 'dashboard' || !parameterSet){

			// set resource view
			params.defaultView = 'resourceDay';


		}


		$('#calendar').fullCalendar(params);
	};


	return fcService;

});



// factory for funtion used by dashboard to acquire events
// created function takes two inputs:
// @param string date - ISO 8601 compliant string
// @param boolean bufferFlag - true if server should return events from upcoming days
emDashServices.factory('getEvents', ['$http', 

	function($http){

		return function(date, bufferFlag, callback){

			// DEBUG:
			// ASYNCHRONITYYYYYYYYYYYYYYYYYYYY MY ENEMY
			var output;

			var requestUrl = 'api/events/' + date;
            // if server should return not only that day's events
            /// but also a buffer of the upcoming events
            if (bufferFlag) {
            	requestUrl += '?buffer=true';
            }

            $http({
                method: 'GET',
                url: requestUrl

            }).then(function successCallback(res) {

                // debug
                // console.log(res.data);
                console.log('success');
                callback(res.data);
                return res.data;

            }, function errorCallback(res) {
                console.debug(res);
                return 'Response failed!';
            });

			console.log(output);
		};

}]);

