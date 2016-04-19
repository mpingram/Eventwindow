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
            url: '/dash-events-upcoming.json'
        }).then(function successCallback(res) {
            $scope.Events = res.data;
            console.debug(res);
            
        }, function errorCallback(res){
            console.log(res);
        });
    }
    
    angular.element(document).ready(function () {    
        updateUpcomingEvents();
        $('#calendar').fullCalendar({
            defaultView: 'resourceDay',
            resources: [
                {'id':'EI','name':'EI'},
                {'id':'EII', 'name':'EII'},
                {'id':'EIII', 'name':'EIII'},
                {'id':'EIV','name':'EIV'},
                {'id':'WIa','name':'WIa'},
                {'id':'WIb','name':'WIb'},
                {'id':'WII','name':'WII'},
                {'id':'WIII','name':'WIII'},
                {'id':'WIV','name':'WIV'},
                {'id':'Lobby','name':'Lobby'},
                {'id':'Library','name':'Library'},
                {'id':'120','name':'120'},
                {'id':'129','name':'129'},
                {'id':'BW11','name':'BW11'},
                {'id':'BE07','name':'BE07'},
                {'id':'WSSC 052','name':'WSSC 052'},
                {'id':'WSSC 071','name':'WSSC 071'},
                {'id':'CHAS','name':'CHAS'}
                ]
        });
    });


    // for debugging list of events, can safely delete
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
});




