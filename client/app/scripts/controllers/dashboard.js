'use strict';

/**
 * @ngdoc function
 * @name em_App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the event_manager dashboard.
 */
angular.module('em_App')
  .controller('DashboardCtrl', function ($http, $scope) {
    
    function updateUpcomingEvents() {
        $http({
            method: 'GET',
            url: '/dash-events-upcoming'+ $.now() +'.json'
        }).then(function successCallback(res) {
            $scope.Events = res.data;
            console.debug(res);
            
        }, function errorCallback(res){
            console.log(res);
        });
    }
    
    angular.element(document).ready(function () {    
        updateUpcomingEvents();
    });
});




