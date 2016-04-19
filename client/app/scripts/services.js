'use strict';

angular.module('services',[])
	.factory('getUpcomingEvents',['$http', function($http){
		$http({
			method: 'GET',
			url: 'api/upcoming_events&t='+$.now()
		});
	}]
);