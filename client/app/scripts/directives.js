'use strict';

var emDashDirectives = angular.module('emDashDirectives', []);


// slide down room list on event list click event
emDashDirectives.directive('emEventListItem', [ function(){

	return {

		replace: 'true',
		templateUrl: 'views/partials/event_list_item_partial.html',
		scope: true,

		
		link: function(scope, elem, attrs){
			elem.children('div.event-list-item').bind('click', function(){
				scope.roomClick = !scope.roomClick;
				console.log(scope.roomClick);

			});
		}
		
		
	};
}]);




/*

emDashDirectives.directive('emEventClick', [ function(){
	// utilize controller which shares scope with.... 
	// a different directive which drops down the list? 
	// Essentially just a wrapper for ng-if?
	return {

		link: function(scope, elem, attrs){
			elem.bind('click', function(){
				// DEBUG: call function defined in $scope? ...then would we even need the directive?
				// close other open room lists
				// 	scope.clicked affects this local scope value,
				//	while $scope's closeRoomLists function affects
				// 	all scopes' clicked values.
				if(scope.roomClick) {
					scope.closeRoomLists();
				}
				// open current room list
				scope.roomClick = !scope.roomClick;
				console.log(scope.roomClick);
				// scroll to current room list

				// move to first calendar day of list

				// highlight events on calendar (jquery selector -> css?)
			});
		}
	};
}]);

*/