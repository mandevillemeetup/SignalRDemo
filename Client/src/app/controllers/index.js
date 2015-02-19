(function () {
	'use strict';

	angular
		.module('signalrdemo')
		.controller('Index', Index);

	/**
	 * @ngdoc controller
	 * @name signalrdemo.controller:Index
	 * @description
	 *
	 */
	/*@ngInject*/
	function Index(topicservice) {
		var vm = this;


		// PUBLIC PROPERTIES
		vm.title = 'Reloadeddd';


		// PUBLIC FUNCTIONS
		vm.doSomething = doSomething;

		// init
		activate();


		//
		// PRIVATE FUNCTIONS

		function activate() {
			//$.connection.hub.url = "http://localhost:8080/signalr";
			//
			//// Declare a proxy to reference the hub.
			//var chat = $.connection.myHub;
			//
			//// Create a function that the hub can call to broadcast messages.
			//chat.client.addMessage = function (name, message) {
			//	// Html encode display name and message.
			//	vm.title = name;
			//	console.log(name + ' ' + message);
			//};
			//
			//// Start the connection.
			//$.connection.hub.start().done(function () {
			//	// Call the Send method on the hub.
			//	chat.server.send('Ryan','W');
			//});
		}

		function doSomething() {
		}

	}

})();