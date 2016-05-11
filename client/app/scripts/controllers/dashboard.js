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
  	// 			- don't forget about repeating events!

    // holds event buffer(s).
    $scope.events = [];


    // aquiring json event data from server.
    angular.element(document).ready( function () { 


        var now = moment();
        // sends GET request for events with query strings of unix timestamp values, ie format('X') 
        getEvents(now.format('X'), now.add(30, 'days').format('X'), function(data){

          // stores session-specific local copy of event buffer
        	$scope.events = $scope.events.concat(data);
          console.log($scope.events);

          // is there a way to add events after initialization?
          // TODO: look into the source code.
          // looks like ajax call within fc events object is how they handle it.
          // consider formatting events on server/db side in a more fc-friendly way?
          // OR do we modify fc to expect data in our event format?
          // fun either way!
        	fc.initialize($scope.events, 'dash');

        });



        // DEBUG: test
        // U really should do unit tests you know
        var testDay = moment('04 27 2016', 'MM-DD-YYYY');
        getEvents( testDay.format('X'), testDay.add(5, 'days').format('X'), function(data) {
          console.log(data);
        });

    });



    // debug
    // for debugging list of events, can safely delete
    // ... once you have the actual data, u know
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
});




