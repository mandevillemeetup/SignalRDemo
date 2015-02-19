(function () {
	'use strict';

	angular
		.module('signalrdemo')
		.controller('Login', Login);

	/**
	 * @ngdoc controller
	 * @name signalrdemo.controller:Login
	 * @description
	 *
	 */
	/*@ngInject*/
	function Login($state) {
		var vm = this;


		// PUBLIC PROPERTIES
		vm.username = null;
		vm.loggedInMessage = null;


		// PUBLIC FUNCTIONS
		vm.doLogin = doLogin;

		// init
		activate();


		//
		// PRIVATE FUNCTIONS

		function activate() {
		}

		function doLogin() {
			$state.go('home.chat', {username: vm.username});
		}

	}

})();
