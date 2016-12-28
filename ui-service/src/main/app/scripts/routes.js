define(['angularAMD', 'app'], function (angularAMD, app) {

    'use strict';

    return app.config(['$stateProvider', '$provide', '$urlRouterProvider', '$httpProvider',

        function ($stateProvider, $provide, $urlRouterProvider) {

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
                .state('signup', angularAMD.route(
                    {
                        url: '/signup',
                        templateUrl: 'views/signup/signup.html',
                        controllerUrl: 'controllers/signup.controller'

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

                    }))
                .state('product', angularAMD.route(
                    {
                        url: '/product',
                        templateUrl: 'views/product/list.html',
                        controllerUrl: 'controllers/product.controller'

                    }))
                .state('product_edit', angularAMD.route(
                    {
                        url: '/product/edit/:id',
                        templateUrl: 'views/product/edit.html',
                        controllerUrl: 'controllers/product.controller'

                    }))
                .state('product_save', angularAMD.route(
                    {
                        url: '/product/save/:id',
                        templateUrl: 'views/product/save.html',
                        controllerUrl: 'controllers/product.controller'

                    }))
        }]);


});
