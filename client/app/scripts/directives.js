'use strict';

var emDashDirectives = angular.module('emDashDirectives', []);



// constructs the event list, handles collapsing days
emDashDirectives.directive('emEventList', [ function(){

	return {
		replace: 'true',
		templateUrl: 'views/partials/event_list_partial.html',

	};

}]);



// represents one event in the event list
emDashDirectives.directive('emEventListItem', [ function(){

	return {

		replace: 'true',
		templateUrl: 'views/partials/event_list_item_partial.html',
		scope: true,

		controller: ['$scope' , function($scope){

			$scope.localRoomClick = false;

			$scope.eventClick = function(emEvent){

				if($scope.activeEventIds.curr !== $scope.event._id){
					$scope.activeEventIds.curr = $scope.event._id;
				} else {
					$scope.activeEventIds.curr = null;
				}

				// Tell fullcalendar to display day of event.
				// DEBUG: acts as though roomObj is sorted with first event in 0 index.
				// could lead to inconsistent behavior if you don't watch out for this.
				// TODO: implement separate click for each room/each day?
				jQuery('#calendar').fullCalendar('gotoDate', emEvent.roomObject[0].start);
				// fullcalendar should load the events for this day...
				// then, highlight fc events
				// ... jqueryyyyyyy i want to so baaad
				// ok 

			};

		}]
	};
}]);



