(function () {
	'use strict';

	angular
		.module('signalrdemo')
		.factory('topicservice', topicservice);

	/**
	 * @ngdoc service
	 * @name signalrdemo.service:topicservice
	 * @description
	 *
	 */
	/*@ngInject*/
	function topicservice(Hub,$rootScope) {

		var topicsHub = new Hub('topicsHub', {

			//client side methods
			listeners:{
				'topicAdded': function (topic) {
					$rootScope.$apply(function(){
						$rootScope.$broadcast('topicAdded', topic);
					});
				},
				'topicsLoaded': function (topics) {
					$rootScope.$apply(function(){
						$rootScope.$broadcast('topicsLoaded', topics);
					});
				},
				'topicRemoved': function (topics) {
					$rootScope.$apply(function(){
						$rootScope.$broadcast('topicRemoved', topics);
					});
				}
			},

			//server side methods
			methods: ['add','get','remove'],

			//handle connection error
			errorHandler: function(error){
				console.error(error);
			},

			//specify a non default root
			rootPath: 'http://localhost:8080/signalr',
			useSharedConnection: false

		});

		function addTopic(topicTitle) {
			topicsHub.add({title: topicTitle});
		}

		function getTopics(){
			topicsHub.get();
		}

		function removeTopic(id){
			topicsHub.remove(id);
		}

		return {
			addTopic: addTopic,
			getTopics: getTopics,
			removeTopic: removeTopic
		};
	}

})();

