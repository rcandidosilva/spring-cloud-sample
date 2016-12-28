define(['app'], function () {

    'use strict';

    return ['$scope', '$state', '$rootScope', '$resource', '$http', '$httpParamSerializer', '$cookies', 'BaseController',
        function ($scope, $state, $rootScope, $resource, $http, $httpParamSerializer, $cookies, BaseController) {
        angular.extend($scope, BaseController);




    }];
});