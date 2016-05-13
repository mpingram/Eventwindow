'use strict';

var emDashDirectives = angular.module('emDashDirectives', []);


// slide down room list on event list click event
emDashDirectives.directive('emEventListItem', [ '$animate', function($animate){

	return {

		replace: 'true',
		templateUrl: 'views/partials/event_list_item_partial.html',
		link: function(scope, elem, attrs){

			elem.bind('click', function(){
				// debug: V-- right?
				// elem ng-model clicked = ! elem ng-model clicked
			});
		}
	};
}]);