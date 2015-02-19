(function () {
	'use strict';

	angular
		.module('signalrdemo')
		.factory('chatservice', chatservice);

	/**
	 * @ngdoc service
	 * @name signalrdemo.service:chatservice
	 * @description
	 *
	 */
	/*@ngInject*/
	function chatservice(Hub,$rootScope) {

		var chathub = new Hub('chatHub', {

			//client side methods
			listeners:{
				'addMessage': function (message) {
					$rootScope.$apply(function(){
						$rootScope.$broadcast('receiveMessage', message);
					});
				},
				'addNotification': function (message) {
					$rootScope.$apply(function(){
						$rootScope.$broadcast('addNotification', message);
					});
				}
			},

			//server side methods
			methods: ['send'],

			//handle connection error
			errorHandler: function(error){
				console.error(error);
			},

			//specify a non default root
			rootPath: 'http://localhost:8080/signalr',
			useSharedConnection: false

		});

		function sendMessage(message) {
			chathub.send(message);
		}

		return {
			sendMessage: sendMessage
		};
	}

})();
