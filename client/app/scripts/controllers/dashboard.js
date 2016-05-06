'use strict';

/**
 * @ngdoc function
 * @name em_App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the event_manager dashboard.
 **/


angular.module('em_App')

  .controller('DashboardCtrl', function ($scope, getEvents, fc) {

	// ok game plan: we call api for single event + buffer of server-defined length;
  	// 
  	// quick notes on search bar behavior: 
  	// 			- searches through buffer and then submits server search request
  	// 			- filters buffer events through angular data binding, for fashion souls
  	// 			
  	// 			- IF no matches in buffer, submit search request
  	// 					- this means that if multiple matches in buffer, search ends at end of buffer.
  	// 			- search request is GET api/events/search?param="string"
  	// 			- db returns all matches, user then filters through them with |<||>|

    $scope.events = [];

    angular.element(document).ready( function () { 


    	// aquires json event data from server.
    	// debug: asynchronity is going to either kill me or make me smarter
        getEvents( $.now(), true, function(data){

        	$scope.events = $scope.events.concat(data);
        	console.log($scope.events);
        	fc. initialize ($scope.events, 'dash');
        });
        //$scope.events = $scope.events.concat( eventBuffer );


        // TODO: format events properly for fullcalendar display and for list inclusion.
        // TODO: move to services / elsewhere
        /*$('#calendar').fullCalendar({
            defaultView: 'resourceDay',
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
            ]
        }); */
    });



    // debug
    // for debugging list of events, can safely delete
    // ... once you have the actual data u know
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
});




