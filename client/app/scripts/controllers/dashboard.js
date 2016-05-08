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

    // will hold event buffer(s).
    $scope.events = [];

    angular.element(document).ready( function () { 

    	// aquires json event data from server.
        getEvents( $.now(), true, function(data){

        	$scope.events = $scope.events.concat(data);
        	console.log(fc.format($scope.events));

          // is there a way to add events after initialization?
          // TODO: look into the source code.
        	fc.initialize($scope.events, 'dash');

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




