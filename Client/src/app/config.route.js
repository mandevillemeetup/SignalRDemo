(function(){
    'use strict';

    angular
        .module('signalrdemo')
        .config(routeConfig);

	/*@ngInject*/
    function routeConfig($stateProvider, $urlRouterProvider){
	    $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
		        views: {
			        'navbar': {
				        templateUrl: 'partials/navbar.html',
				        controller: function($rootScope){
					        $rootScope.$on('addNotification', function(e, message){
						       toastr.info(message.Message, 'Message from ' + message.Sender);
					        });
				        }
			        },
			        '': {
				        templateUrl: 'views/index.html',
				        controller: 'Index',
				        controllerAs: 'main'
			        }
		        }

            })
	        .state('home.login', {
	            url: 'login',
	            views: {
	                '@': {
	                    templateUrl: 'views/login.html',
	                    controller: 'Login',
	                    controllerAs: 'login'
	                }
	            }
	        })
	        .state('home.topics', {
	            url: 'topics',
	            views: {
	                '@': {
	                    templateUrl: 'views/topics.html',
	                    controller: 'Topics',
	                    controllerAs: 'vm'
	                }
	            }
	        })
	        .state('home.counter', {
	            url: 'counter',
	            views: {                  
	                '@': {
	                    templateUrl: 'views/counter.html',
	                    controller: 'Counter',
	                    controllerAs: 'counter'
	                }
	            },
	            data: {
	                displayName: ''
	            }
	        })
	        .state('home.chat', {
	            url: 'chat/:username',
	            views: {
		            '@': {
			            templateUrl: 'views/chat.html',
			            controller: 'Chat',
			            controllerAs: 'chat'
		            }
	            }
	        });


    }

})();