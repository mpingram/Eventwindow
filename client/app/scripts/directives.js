'use strict';

var emDashDirectives = angular.module('emDashDirectives', []);


// slide down room list on event list click event
emDashDirectives.directive('emEventListItem', [ '$animate', function($animate){

	return {

		replace: 'true',
		templateUrl: 'views/partials/event_list_item_partial.html',
		link: function(scope, elem, attrs){

			elem.bind('click', function(){ // function(eventId){
				// logic to open only one dropdown at a time?
				// scroll to li#event._id
			});
		}
	};
}]);