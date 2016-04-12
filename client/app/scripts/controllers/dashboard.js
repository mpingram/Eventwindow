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
    
    angular.element(document).ready(function () {    
        $scope.events = $http({
            method: 'GET',
            url: '/dash-events-json_'+$.now()
        }).then(function successCallback(res) {
            console.log(res);
            
        }, function errorCallback(res){
            console.log(res);
        });
    });
});




