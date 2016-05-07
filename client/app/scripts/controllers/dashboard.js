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

    $scope.events = [];

    angular.element(document).ready( function () { 

    	// aquires json event data from server.
    	// debug: reminder: don't forget about asynchronity, it'll bite ya
    	// debug: good idea to initialize fullcalendar at the end of the async chain?
    	// no! it isn't!
    	// U can do this.
        getEvents( $.now(), true, function(data){

        	$scope.events = $scope.events.concat(data);
        	console.log(fc.format($scope.events));
        	fc.initialize($scope.events, 'dash');
        	// TODO: organize this more intelligently with async in mind.
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




