define(['angularAMD', 'app', 'config'], function (angularAMD, app) {

    'use strict';

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
                } else {
                    return app.CONST.SERVER;
                }
            };

            /**
             * Return the current authentication host
             *
             * @returns {*}
             */
            $rootScope.getAuthHost = function () {

                if (document.location.hostname === 'localhost') {
                    return app.CONST.SECURITY_LOCALHOST;
                } else {
                    return app.CONST.SECURITY_SERVER;
                }
            };

        }]);

    return angularAMD.bootstrap(app);

});
