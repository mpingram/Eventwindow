'use strict';
/**
 * @ngdoc function
 * @name em_App.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the event_manager signup page
 */

angular.module('em_App') // make sure this is set to whatever it is in your client/scripts/app.js
	.controller('SignupCtrl', function ($scope, $http) { // note the added $http depedency
		
		// Here we're creating some local references
		// so that we don't have to type $scope every
		// damn time
		var user;
        var signup;
    
		// Here we're creating a scope for our Signup page.
		// This will hold our data and methods for this page.
        // m ingram - edited from orig $scope.signup = signup = {}
		signup=this;
        
		// In our signup.html, we'll be using the ng-model
		// attribute to populate this object.
        user = signup.user = {};

		// This is our method that will post to our server.

		signup.submit = function () {

			// make sure all fields are filled out...
			if (
				!user.firstname ||
				!user.lastname ||
				!user.email ||
				!user.password1 ||
				!user.password2
			) {
                window.alert('Please fill out all form fields.');
				return false;
			}

			// ...and that the passwords match
			if (user.password1 !== user.password2) {
				window.alert('Your passwords must match.');
				return false;
			}

			// Make the request to the server
			var request = $http.post('/signup', user);

			request.success(function(data) {
                // debug: return json msg:success
				console.log(data);
			});

			request.error(function(data) {
                console.log(data);
			});

		};
	});