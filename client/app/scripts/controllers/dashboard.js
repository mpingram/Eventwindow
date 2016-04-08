'use strict';

/**
 * @ngdoc function
 * @name em_App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the event_manager dashboard.
 */
angular.module('em_App')
  .controller('DashboardCtrl', function ($scope) {
    $scope.upcomingEvents = [{
        'name':'foo',
        'prop':'null'
    },
    {
        'name':'bar',
        'prop':'null'
    }];
  });
