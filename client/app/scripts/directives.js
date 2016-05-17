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

			$scope.localRoomClick = $scope.globalClickEvents.roomClick;

			$scope.eventClick = function(){
				$scope.globalClickEvents.roomClick = false;
				$scope.localRoomClick = !$scope.localRoomClick;
			};

		}]
	};
}]);



