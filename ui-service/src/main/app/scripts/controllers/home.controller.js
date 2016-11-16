define(['app'], function () {

    'use strict';

    return ['$scope','$rootScope', '$http', '$log', 'toastr', 'BaseController', function ($scope, $rootScope, $http, $log, toastr, BaseController) {

            angular.extend($scope, BaseController);

            /**
             * Listener when the view is loaded
             */
            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded');
                $http.get("http://localhost:9999/uaa/user")
                    .success( function (data, status, headers, config ) {
                        $scope.user = data;
                        $scope.user.stringify = JSON.stringify(data, undefined, 2);
                    })
                    .error( function (data, status, headers, config ){
                        $log.error( data );
                    });
            });

        }];
});