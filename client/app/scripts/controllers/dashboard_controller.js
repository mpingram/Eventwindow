'use strict';

/**
 * @ngdoc function
 * @name em_App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the event_manager dashboard.
 **/

angular.module('em_App').controller('DashboardCtrl',
	 ['$scope','getEvents','eventClick','fc', 'shared',
	 function ($scope, getEvents, eventClick, fc, shared) {

    // holds event buffer(s).
    $scope.events = [];

    // moment wrapper for use in view
    $scope.format = function(time, formatString){
        return moment(time).format(formatString);
    };

    // aquires json event data from server.
    angular.element(document).ready( function(){ 

        // debug: test dates are set to match apr 28 2016 data
        //var now = moment();
        var now = moment('04 27 2016', 'MM-DD-YYYY');
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
    });

    // handles logic across all scopes 
    $scope.eventClick = function(eventId){
    	return eventClick(eventId);
    };

    $scope.activeEvent = shared.activeEvent;
    $scope.prevEvent = shared.prevEvent;

	$scope.$watch($scope.activeEvent, function(newVal, oldVal){
		$scope.activeEvent = newVal;
		$scope.prevEvent = oldVal;
	});

}]);




