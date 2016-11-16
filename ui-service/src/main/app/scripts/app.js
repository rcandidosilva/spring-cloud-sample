define(['include', 'language'], function (angularAMD, language) {

    'use strict';

    var app = angular.module('app',  [
            'ui.router',
            'ngResource',
            'ngSanitize',
            'ngCookies',
            'toastr',
            'pascalprecht.translate',
            'angucomplete-alt'
        ]
    );

    app.config(['$stateProvider', '$provide', '$urlRouterProvider', '$httpProvider',

        function ($stateProvider, $provide, $urlRouterProvider, $httpProvider, toastr) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider

                .state('home', angularAMD.route(
                    {
                        url: '/home',
                        templateUrl: 'views/home/default.html',
                        controllerUrl: 'controllers/home.controller'

                    }))
                .state('login', angularAMD.route(
                    {
                        url: '/login',
                        templateUrl: 'views/auth/login.html',
                        controllerUrl: 'controllers/auth.controller'

                    }))
                .state('customer', angularAMD.route(
                    {
                        url: '/customer',
                        templateUrl: 'views/customer/list.html',
                        controllerUrl: 'controllers/customer.controller'

                    }))
                .state('customer_edit', angularAMD.route(
                  {
                    url: '/customer/edit/:id',
                    templateUrl: 'views/customer/edit.html',
                    controllerUrl: 'controllers/customer.controller'

                  }))
                .state('customer_save', angularAMD.route(
                  {
                    url: '/customer/save/:id',
                    templateUrl: 'views/customer/save.html',
                    controllerUrl: 'controllers/customer.controller'

                  }));

            $provide.factory('authInterceptor', ['$rootScope', '$q', '$window', '$cookies',
                function ($rootScope, $q, $window, $cookies) {
                    return {
                        request: function (config) {
                            // config.headers = config.headers || {};
                            // if ($cookies.get('tokenSecret') && $cookies.get('tokenSecret') != "null") {
                            //     config.headers['X-AUTH-TOKEN'] = $cookies.get('tokenSecret');
                            //     $rootScope.username = $cookies.get('user');
                            //     $rootScope.userId = $cookies.get('userId');
                            //     $rootScope.userRole = $cookies.get('userRole');
                            //     $rootScope.fullName = $cookies.get('fullName');
                            //     $rootScope.logged = true;
                            // } else {
                            //     config.headers['X-AUTH-TOKEN'] = app.token;
                            //     $rootScope.username = null;
                            //     $rootScope.fullName = null;
                            //     $rootScope.userId = null;
                            //     $rootScope.userRole = null;
                            //     $rootScope.logged = false;
                            // }
                            return config;
                        },
                        response: function (response) {
                            // if (response.status === 401) {
                            //     // handle the case where the user is not authenticated
                            // }
                            // if (response.status === 400) {
                            //     console.log('400');
                            // }
                            return response || $q.when(response);
                        }
                    };
                }]);

            $provide.factory('errorHandlerInterceptor', ['$rootScope', '$q', '$window', '$location', 'toastr',
                function ($rootScope, $q, $window, $location, toastr) {
                    return {
                        request: function(config) {
                            return config;
                        },
                        requestError : function(rejection) {
                            return rejection;
                        },
                        responseError : function(rejection) {
                            if( rejection.status === 401 ) {
                                if (rejection.config.url.indexOf("/login") < 0) {
                                    $rootScope.$broadcast("ErrorInterceptor", 401, rejection.statusText);
                                }
                                return $q.reject(rejection);
                            }
                            if( rejection.status === 400 ) {
                                if (rejection.config.url.indexOf("/forgetpassword") < 0) {
                                    $rootScope.$broadcast("ErrorInterceptor", 400);
                                }
                                return $q.reject(rejection);
                            }
                            if( rejection.status === 404 ) {
                                $rootScope.$broadcast("ErrorInterceptor", 404);
                                return $q.reject(rejection);
                            }
                            if( rejection.status >= 500) {
                                $rootScope.$broadcast("ErrorInterceptor", 500);
                                return $q.reject(rejection);
                            }
                            return $q.reject(rejection);

                        }
                    };
                }]);

            $httpProvider.interceptors.push('authInterceptor');
            $httpProvider.interceptors.push('errorHandlerInterceptor');

        }]);

    app.config(['toastrConfig', '$translateProvider',
        function (toastrConfig, $translateProvider) {

            angular.extend(toastrConfig, {
                allowHtml: false,
                closeButton: true,
                closeHtml: '<span class="close_button"></span>'
            });

            $translateProvider.translations('pt_BR', language.pt_BR);
            $translateProvider.translations('en_GB', language.en_GB);

            $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
            $translateProvider.preferredLanguage('pt_BR');
        }]);

    app.CONST = {
        LOCALHOST: "http://localhost:8080",
        SERVER: "http://server:8080"
    };

    app.run(['$rootScope', '$timeout', '$http', '$httpParamSerializer', '$window', '$cookies',
        function ($rootScope, $timeout, $http, $httpParamSerializer, $window, $cookies) {

            /**
             * Return the current host
             *
             * @returns {*}
             */
            $rootScope.getHost = function () {

                if (document.location.hostname === 'localhost') {

                    return app.CONST.LOCALHOST;
                }
                else {
                    return app.CONST.SERVER;
                }
            };

        }]);

    return angularAMD.bootstrap(app);
});
