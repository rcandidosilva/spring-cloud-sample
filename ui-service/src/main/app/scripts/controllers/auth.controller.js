define(['app'], function () {

    'use strict';

    return ['$scope', '$state', '$rootScope', '$resource', '$http', '$httpParamSerializer', '$cookies', 'BaseController',
        function ($scope, $state, $rootScope, $resource, $http, $httpParamSerializer, $cookies, BaseController) {
        angular.extend($scope, BaseController);

        $scope.data = {
            grant_type:"password",
            username: "",
            password: "",
            client_id: "client"
        };

        $scope.encoded = btoa("client:secret");

        $scope.login = function() {
            var req = {
                method: 'POST',
                url: "http://localhost:9999/uaa/oauth/token",
                headers: {
                    "Authorization": "Basic " + $scope.encoded,
                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                data: $httpParamSerializer($scope.data)
            };
            $http(req).then(function(data){
                $rootScope.logged = true;
                $http.defaults.headers.common.Authorization = 'Bearer ' + data.data.access_token;
                $cookies.put("access_token", data.data.access_token);
                $state.go('home');
            });
        };

        $rootScope.logout = function() {
            $rootScope.logged = false;
        };


    }];
});