define(['app', 'factory/customer.factory'], function () {

    'use strict';

    return ['$scope', '$rootScope', '$stateParams', '$state', 'BaseController', 'Customer',
        function ($scope, $rootScope, $stateParams, $state, BaseController, Customer) {

            angular.extend($scope, BaseController);

            $scope.customer = new Customer();
            $scope.page = 0;
            $scope.size = 10;

            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log('state Change Success');
                if (toState.name == 'customer') {
                  $scope.customer.list($scope.page, $scope.size);
                } else if (toState.name == 'customer_edit') {
                  $scope.customer.load($stateParams.id);
                }

            });

            /**
             * Listener when the view is loaded
             */
            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded...');
            });

            $scope.delete = function(id) {
                $scope.customer.delete(id, function(data, status) {
                    if (status === 200) {
                      $scope.customer.list($scope.page, $scope.size);
                    }
                });
            };

            $scope.save = function() {
                $scope.customer.save($scope.customer, function(data, status) {
                    if (status === 200) {
                      $state.go('customer');
                    }
                })
            };

            $scope.update = function() {
                $scope.customer.update($scope.customer, function(data, status) {
                  if (status === 200) {
                    $state.go('customer');
                  }
                })
            };

        }];
});
