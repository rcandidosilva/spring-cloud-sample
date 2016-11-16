define(
    [
        'angularAMD','angular','underscore','angular-translate',
        'angular-ui-router','angular-toastr','angular-cookies','angucomplete-alt',
        'angular-resource','angular-sanitize','popover','nemLogging','waypoints',
        'angular-toastr-tpl',

        'directives/core.include.template.directive',
        'directives/core.main.directive',
        'directives/core.footer.directive',
        'directives/core.on.finish.render.directive',
        'filters/core.trim.filter',
        'controllers/base.controller'
    ],
    function (angularAMD) {
        'use strict';

        return angularAMD;
    }
);
