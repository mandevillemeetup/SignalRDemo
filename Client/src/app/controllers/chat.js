(function () {
	'use strict';

	angular
		.module('signalrdemo')
		.controller('Chat', Chat);


	/**
	 * @ngdoc controller
	 * @name signalrdemo.controller:chat
	 * @description
	 *
	 */
	/*@ngInject*/
	function Chat(chatservice, $rootScope, $stateParams) {
		var vm = this;


		// PUBLIC PROPERTIES
		vm.user = $stateParams.username;
		vm.inputmessage = '';
		vm.messages = [];


		// PUBLIC FUNCTIONS
		vm.sendMessage = sendMessage;

		// init
		activate();

		//
		// PRIVATE FUNCTIONS
		function activate() {


			$rootScope.$on('receiveMessage', function(e, message){
				if(message.Message.length <=1 ) return;
				vm.messages.push(message);
			});
		}



		function sendMessage() {
			var chatmessage = {
				message: vm.inputmessage,
				sender: vm.user,
				sendDateTime: moment()
			};

			chatservice.sendMessage(chatmessage);
			vm.inputmessage = '';
		}

	}

})();
