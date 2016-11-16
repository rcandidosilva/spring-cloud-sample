define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('onFinishRender', ['$timeout', function ($timeout) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    }]);

    angularAMD.directive('onFinishRenderEvent', ['$timeout', function ($timeout) {

      return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attrs.onFinishRenderEvent);
                    });
                }
             }
        };
    }]);
});
