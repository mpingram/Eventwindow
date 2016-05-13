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
    'ngTouch',
    'emDashServices',
    'emDashDirectives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard_view.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dash'
      })
      .when('/signup', {
        templateUrl: 'views/signup_view.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


