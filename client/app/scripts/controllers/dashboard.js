'use strict';

/**
 * @ngdoc function
 * @name em_App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the event_manager dashboard.
 */

 /**
  * TODO: conceptually, solve problem of list and calendar in same view.
  *                 - does list load all events while calendar only loads daily?
  *                 - no, that's dumb. But how do we make the app responsive?
  *                 - heuristic: current and future events will be queried more often
  *                         than past events. So, EM client loads one or two weeks' worth
  *                         of upcoming events on doc ready and displays them in both views.
  *                         Now, supposing someone wants to go back in time.... ? 
  *                                 - why would someone need to do this? 
  *                                         - to see if recent events happened ok?
  *                                         - billing?
  *                                         - feedback from user?
  *                                         - global review of previous haps?
  *
  *                         - ok, so what are the complications of a "show past events" button?
  *                             - it should load events from the past one or two weeks and display them, no big.
  *
  */

angular.module('em_App')
  .controller('DashboardCtrl', function ($http, $scope) {

    angular.element(document).ready(function () { 

        function getEvents(timeStart, timeEnd) {

            var requestUrl = 'api/events?timestart='+timeStart+'&timeend='+timeEnd;

            $http({
                method: 'GET',
                url: requestUrl

            }).then(function successCallback(res) {

                // debug
                console.log(res.data);

                // severely limiting way of doing this.
                // maybe better to initialize calendar
                // with the results of this ajax call?
                $scope.Events = res.data;

            }, function errorCallback(res) {
                console.debug(res);
            });
        }

        // TODO: code which calls this method from start of today to end of today.
        getEvents( $.now() , $.now() );

        // TODO: format events properly for fullcalendar display and for list inclusion.
        $('#calendar').fullCalendar({
            defaultView: 'resourceDay',
            resources: [
                {'id':'EI',         'name':'EI'},
                {'id':'EII',        'name':'EII'},
                {'id':'EIII',       'name':'EIII'},
                {'id':'EIV',        'name':'EIV'},
                {'id':'WIa',        'name':'WIa'},
                {'id':'WIb',        'name':'WIb'},
                {'id':'WII',        'name':'WII'},
                {'id':'WIII',       'name':'WIII'},
                {'id':'WIV',        'name':'WIV'},
                {'id':'Lobby',      'name':'Lobby'},
                {'id':'Library',    'name':'Library'},
                {'id':'120',        'name':'120'},
                {'id':'129',        'name':'129'},
                {'id':'BW11',       'name':'BW11'},
                {'id':'BE07',       'name':'BE07'},
                {'id':'WSSC 052',   'name':'WSSC 052'},
                {'id':'WSSC 071',   'name':'WSSC 071'},
                {'id':'CHAS',       'name':'CHAS'}
            ]
        });
    });


    // for debugging list of events, can safely delete
    // ... once you have the actual data u know
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
});




