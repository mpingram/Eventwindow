'use strict';

var emDashDirectives = angular.module('emDashDirectives', []);



// constructs the event list, handles collapsing days
emDashDirectives.directive('emEventList', [function(){

	return {
		replace: 'true',
		templateUrl: 'views/partials/event_list_partial.html',
		scope: false,

		link: function(scope, elem, attrs){
		}

	};
}]);



// represents one event in the event list
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



