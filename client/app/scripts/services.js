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
	fcService.format = function( dbData ){

		var fcData;

		// helper function which formats one entry at a time
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

			// DEBUG: is this how jack did it?
			output.title = 	data.eventName + '\n' + data.organizer;

			// DEBUG: u silly goose, that's not how the data is formatted
			// DEBUG: PATCH JOB.
			// can we modify the fullcalendar source code to allow it to support
			// multi-room events without fuss? (ie, like 'resources' but with ability to specify different times)
			output.start = 	data.roomObj[0].timeStart;
			output.end =	data.roomObj[0].timeEnd;
			output.resources = data.roomObj[0].room;

			// DEBUG: alternately, respond to onclick event hook
			output.url = 	'events/' + data._id;

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
	// TODO: separate initialization and event population, to take advantage of the a in ajax, u silly gosling
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
	        // TODO: fix this bs
	        // should function here handle logic that if events aren't in eventbuffer, pull data from server?
	        // will not work if passed non-array events,
	        // but that should never happen.
	        events: that.format(eventsData)
	        /*
	        events: [
		        {
		            title  : 'event1',
		            start  : '2016-05-06',
		            resources: 'EI'
		        },
		        {
		            title  : 'event2',
		            start  : '2016-05-06',
		            end    : '2016-05-07',
		            resources: 'EII'
		        },
		        {
		            title  : 'event3',
		            start  : '2016-05-06T12:30:00',
		            end    : '2016-05-06T15:00:00',
		            allDay : false, // will make the time show
		            resources: 'EIII'
		        }

    		]
    		*/
	        


		};

		// if dashboard environment (DEBUG: or no parameterSet passed)
		if (parameterSet === 'dash' || parameterSet === 'dashboard' || !parameterSet){

			// set resource view
			params.defaultView = 'resourceDay';


		}

		// DEBUG: TODO: moment.zone, apparently in use by fullcalendar fork, is deprecated
		// and will need to be edited in the source code.
		$('#calendar').fullCalendar(params);
	};

	fcService.populate = function( eventsData ){

		eventsData = this.format(eventsData);

		// how do we modify fullcalendar once it's initialized?
		$('#calendar').fullCalendar({

		});


	};

	return fcService;

});



// factory for funtion used by dashboard to acquire events
// created function takes two inputs:
// @param string date - ISO 8601 compliant string
// @param boolean bufferFlag - true if server should return events from upcoming days
emDashServices.factory('getEvents', ['$http', 

	function($http){

		// debug: mecessary?
		return function(date, bufferFlag, callback){
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

                callback(res.data);
                //return res.data;

            }, function errorCallback(res) {
                console.debug(res);
                return 'Response failed!';
            });
		};

}]);

