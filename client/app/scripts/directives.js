'use strict';

var emDashDirectives = angular.module('emDashDirectives', []);


// slide down room list on event list click event
emDashDirectives.directive('emEventListItem', [ function(){

	return {

		restrict: 'AE',
		replace: 'false',
		templateUrl: 'views/partials/event_list_item.html',
		link: function(scope, elem, attrs){

			elem.bind('click', function(){
				elem.css('background-color', 'white');
			});

			elem.bind('mouseover', function(){
				elem.css('cursor', 'pointer');

			});
		}
	};
}]);