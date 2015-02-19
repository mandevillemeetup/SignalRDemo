(function () {
	'use strict';

	angular
		.module('signalrdemo')
		.controller('Topics', Topics);

	/**
	 * @ngdoc controller
	 * @name signalrdemo.controller:Topics
	 * @description
	 *
	 */
	/*@ngInject*/
	function Topics(topicservice, $rootScope) {
		var vm = this;


		// PUBLIC PROPERTIES
		vm.topics = [];
		vm.topic = null;


		// PUBLIC FUNCTIONS
		vm.addTopic = addTopic;
		vm.removeTopic = removeTopic;

		// init
		activate();


		//
		// PRIVATE FUNCTIONS

		function activate() {
			topicservice.getTopics();

			$rootScope.$on('topicsLoaded', function(e, topics){
				vm.topics = topics;
			});

			$rootScope.$on('topicAdded', function(e, topic){
				vm.topics.push(topic);
			});

			$rootScope.$on('topicRemoved', function(e, topicId){
				var topic = _.find(vm.topics, function(item){return item.Id === topicId;});
				var idx = vm.topics.indexOf(topic);

				vm.topics.splice(idx,1);
			});
		}

		function addTopic() {
			topicservice.addTopic(vm.topic);
		}

		function removeTopic(id){
			topicservice.removeTopic(id);
		}

	}

})();