(function () {
	'use strict';

	angular
		.module('signalrdemo')
		.factory('counterservice', counterservice);

	/**
	 * @ngdoc service
	 * @name signalrdemo.service:counterservice
	 * @description
	 *
	 */
	/*@ngInject*/
	function counterservice(Hub,$rootScope) {

		var counterHub = new Hub('counterHub', {

			//client side methods
			listeners:{
				'updateCount': function (count) {
					$rootScope.$apply(function(){
						$rootScope.$broadcast('updateCount', count);
					});
				},
				'sendCurrentCount': function (count) {
					$rootScope.$apply(function(){
						$rootScope.$broadcast('sendCurrentCount', count);
					});
				}
			},

			//server side methods
			methods: ['startCounter','getCount'],

			//handle connection error
			errorHandler: function(error){
				console.error(error);
			},

			//specify a non default root
			rootPath: 'http://localhost:8080/signalr',
			useSharedConnection: false
		});

		function start(total) {
			counterHub.startCounter(total);
			counterHub.getCount();
		}

		function getCurrentCount(){
			counterHub.getCount();
		}

		return {
			start: start,
			getCurrentCount: getCurrentCount
		};
	}

})();
