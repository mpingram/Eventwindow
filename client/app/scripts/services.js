'use strict';

var emDashServices = angular.module('emDashServices', ['ngResource']);

emDashServices.factory('Event', ['$resource',
  function($resource){
    return $resource('api/events?:queries', {}, {
      query: {method:'GET', params:{queryString:'queries'}, isArray:true}
    });
  }]);