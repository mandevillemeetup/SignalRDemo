(function () {
	'use strict';

	angular
		.module('signalrdemo')
		.controller('Counter', Counter);

	/**
	 * @ngdoc controller
	 * @name signalrdemo.controller:Counter
	 * @description
	 *
	 */
	/*@ngInject*/
	function Counter(counterservice, $rootScope, $timeout) {
		var vm = this;

		// PUBLIC PROPERTIES
		vm.totalrecords = 0;
		vm.progressValue = 0;
		vm.started = false;


		// PUBLIC FUNCTIONS
		vm.start = start;

		// init
		activate();


		//
		// PRIVATE FUNCTIONS

		function activate() {
			counterservice.getCurrentCount();

			$rootScope.$on('sendCurrentCount', function(e, count){
				$timeout(function(){
					vm.totalrecords = count.Item2;

					if(count.Item1 > 0){
						vm.started = true;
					}

					if(count.Item1 === count.Item2)vm.started = false;

				});
			});


			$rootScope.$on('updateCount', function(e, progress){
				$timeout(function(){
					vm.progressValue = progress;
				});
			});
		}

		function start() {
			vm.started = true;
			counterservice.start(vm.totalrecords);
		}

	}

})();