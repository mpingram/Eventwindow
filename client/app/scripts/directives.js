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
		scope: 'false', // ?

		link: function(scope, elem, attrs){

			scope.eventClick = function(){

				// stores array of all room objects associated with event
				var eventRooms = jQuery('#calendar').fullCalendar('clientEvents', scope.event._id);

				// switches on active event, visible on emDashController's scope.
				if (scope.activeEventIds.curr !== scope.event._id){

					// scrolls element into view
					// TODO: write custom ver, or use plugin, with smooth scrolling.
					// DEBUG: commented out below
					//elem[0].scrollIntoView({behavior: 'smooth', block: 'start'});

					scope.activeEventIds.curr = scope.event._id;


					// tells fullcalendar to display active event's day 
					// DEBUG: acts as though roomObj is sorted with first event in 0 index.
					// could lead to inconsistent behavior if you don't watch out for this.
					jQuery('#calendar').fullCalendar('gotoDate', scope.event.roomObject[0].start);

					// debug
					// agh think of a better name than 'rooms'
					// DEBUG: changing class after render? You silly goose!
					// -- more evidence for moving this to a service?
					for (var i=0;i<eventRooms.length;i++){
						// DEBUG: watch out 
						eventRooms[i].className.push('selected');
						jQuery('#calendar').fullCalendar('renderEvent', eventRooms[i]);
					}
					console.log(eventRooms);

				} else {

					scope.activeEventIds.curr = null;



					// DEBUG: NAAAH, only applies when event is clicked closed.
					// also doesn't get rid of the 'selected' class.
					//
					// besides, this is horrific
					for (var k=0;k<eventRooms.length;k++){
						if( eventRooms[k].className[ eventRooms[k].className.length-1 ] === 'selected' ){
							eventRooms[k].className.pop();
							jQuery('#calendar').fullCalendar('renderEvent', eventRooms[k]);
						}
					}
				}

				// now, highlight the rooms in fullCalendar
				// todo: How do we do this The Angular Way(tm)?

			};

		}
	};
}]);



