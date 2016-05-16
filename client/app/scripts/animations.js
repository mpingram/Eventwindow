'use strict';

var emDashAnimations = angular.module('emDashAnimations', ['ngAnimate']);


// wrapper for Jquery slideDown() - uses ngIf's enter
// and leave hooks.
emDashAnimations.animation('.em-slide-down', [ function(){

	return {

		enter: function(element, doneFn){
			jQuery(element).hide().slideDown(300, doneFn);
			// TODO: onDone call scroll to li#event._id
			// or is there a better place for it considering we need to also close other li's?

		},

		leave: function(element, doneFn){
			jQuery(element).show().slideUp(200, doneFn);

		}

	};

}]);