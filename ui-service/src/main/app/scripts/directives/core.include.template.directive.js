define(['angularAMD'], function (angularAMD ) {

    angularAMD.directive('includeLayout', function ( ) {

        'use strict';

        return {
            replace: true,
            restrict: 'A',
            templateUrl: function (element, attr) {
                return attr.includeLayout;
            },
            compile: function(element){
                element[0].className = element[0].className.replace(/placeholder[^\s]+/g, '');
            }
        };
    });
});
