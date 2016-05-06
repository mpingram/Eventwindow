'use strict';


// DEBUG: if using resource, need to add 'ngResource' back to dependencies
var emDashServices = angular.module('emDashServices', []);


// factory for funtion used by dashboard to acquire events
// created function takes two inputs:
// @param string date - ISO 8601 compliant string
// @param boolean bufferFlag - true if server should return events from upcoming days
emDashServices.factory('getEvents', ['$http', 
	function($http){

		return function(date, bufferFlag){

			var requestUrl = 'api/events/' + date;
            // if server should return not only that day's events
            /// but also a buffer of the upcoming events
            if (bufferFlag) {
            	requestUrl += '?buffer=true';
            }

            $http({
                method: 'GET',
                url: requestUrl

            }).then(function successCallback(res) {

                // debug
                console.log(res.data);
                
                return res;

            }, function errorCallback(res) {
                console.debug(res);
                return 'Response failed!';
            });

		};
}]);


// DEBUG: only useful if not using $http service for ajax
// requests, which like why not
emDashServices.factory('Event', ['$resource',
  function($resource){
    return $resource('api/events', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);