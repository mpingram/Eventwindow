'use strict';

var emDashServices = angular.module('emDashServices', ['ngResource']);

emDashServices.factory('Event', ['$resource',
  function($resource){
    return $resource('api/events', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);