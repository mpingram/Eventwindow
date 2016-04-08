'use strict';

/**
 * @ngdoc overview
 * @name em_App
 * @description
 * # Event manager: manage events.
 *
 * Main module of the application.
 */
angular
  .module('em_App', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dash'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


// where do i stick this?
//does jquery even work here? Guess we'll find out
$(document).ready(function(){
    $('calendar').fullCalendar({
        // options and callbacks go here
    });
});