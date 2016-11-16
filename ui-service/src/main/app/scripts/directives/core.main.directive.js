define(['angularAMD', 'bootstrap'], function (angularAMD) {

    'use strict';

    angularAMD.directive('coreMain', ['$timeout', 'toastr', 'BaseController', function ( $timeout, toastr, BaseController ) {

        return {

            restrict: 'EA',

            transclude: true,

            templateUrl: 'views/core/main.tpl.html',

            controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$window', '$translate','$cookies',

                function( $scope, $http, $rootScope, $state, $q, $window, $translate, $cookies) {

                    angular.extend($scope, BaseController);

                    $scope.showHeaderForm = false;


                    /**
                     * Listener when the state is changed
                     */
                    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                        $scope.showHeaderForm = toState.name != 'home';
                    },true);

                }
            ],

            link: function( scope, element, attrs ){


            }
        };
    }]);
});
