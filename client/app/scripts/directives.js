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
emDashDirectives.directive('emEventListItem', [ 'highlightEvent', function(highlightEvent){

	return {

		replace: 'true',
		templateUrl: 'views/partials/event_list_item_partial.html',
		scope: {
			eventClick: '&', // from services.js
			event: '=', // from ng-repeat scope
			activeEventIds: '=' // from emDashController scope
		}, 

		link: function(scope, elem, attrs){


			/*
			scope.eventClick = function(event){

				// switches on active event, visible on emDashController's scope.
				if (scope.activeEventIds.curr !== scope.event._id){

					// scrolls element into view
					// TODO: write custom ver, or use plugin, with smooth scrolling.
					// DEBUG: commented out below
					// elem[0].scrollIntoView({behavior: 'smooth', block: 'start'});

					scope.activeEventIds.curr = scope.event._id;
					console.log(scope.activeEventIds.curr);

					highlightEvent.selectEvent(scope.event._id);

					if (scope.activeEventIds.prev !== undefined){
						highlightEvent.unselectEvent(scope.activeEventIds.prev);
					}

				} else {

					scope.activeEventIds.curr = undefined;
					highlightEvent.unselectEvent(scope.event._id);

				}
			};// scope.eventClick
			*/
		} // link
	}; // factory 
}]); // emEventListItem



