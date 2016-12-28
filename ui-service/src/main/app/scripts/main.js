require.config({
    baseUrl: 'scripts/',
    waitSeconds: 0,

    // alias libraries paths.  Must set 'angular'
    paths: {
        'jquery' : 'ext/jquery.min',
        'jquery-ui': 'ext/jquery-ui',
        'jquery-validation': 'ext/additional-methods',
        'jquery-magnific-popup':'ext/jquery.magnific-popup',
        'jquery-tablesorter':'ext/jquery.tablesorter',
        'waypoints':'ext/jquery.waypoints',
        'popover':'ext/jquery.webui-popover',
        'angular': 'ext/angular',
        'angular-ui-router': 'ext/angular-ui-router',
        'angular-translate': 'ext/angular-translate',
        'angular-sanitize': 'ext/angular-sanitize',
        'angular-toastr': 'ext/angular-toastr',
        'angular-toastr-tpl': 'ext/angular-toastr.tpls',
        'angular-cookies': 'ext/angular-cookies',
        'angular-tablesort': 'ext/angular-tablesort',
        'angularAMD': 'ext/angularAMD',
        'ngload': 'ext/ng-load',
        'angular-resource': 'ext/angular-resource',
        'bootstrap' : 'ext/bootstrap',
        'underscore': 'ext/underscore',
        'nemLogging': 'ext/angular-simple-logger',
        'leaflet-directive' : 'ext/angular-leaflet-directive',
        'leaflet' : 'ext/leaflet',
        'leaflet.markercluster': 'ext/leaflet.markercluster',
        'angucomplete-alt':'ext/angucomplete-alt',
        'highcharts-ng': 'ext/highcharts-ng'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'jquery': { exports: '$'},
        'jquery-ui': { deps: ['jquery']},
        'jquery-validation': { deps: ['jquery']},
        'jquery-magnific-popup': { deps: ['jquery']},
        'jquery-tablesorter': { deps: ['jquery']},
        'waypoints': { deps: ['jquery']},
        'popover': { deps: ['jquery']},
        'angular':{ exports: 'angular'},
        'angularAMD': { exports: 'angularAMD', deps: ['angular']},
        'ngload':{ exports: 'ngload', deps: ['angularAMD']},
        'angular-resource': { deps: ['angular']},
        'angular-translate': { deps: ['angular']},
        'angular-ui-router':{ deps: ['angular']},
        'angular-sanitize':{ deps: ['angular']},
        'angular-toastr':{ deps: ['angular']},
        'angular-toastr-tpl':{ deps: ['angular-toastr']},
        'angular-cookies': { deps: ['angular']},
        'angular-tablesort': { deps: ['angular','jquery']},
        'bootstrap': { exports: 'bootstrap', deps: ['jquery']},
        'nemLogging':  { deps: ['angular','angular-sanitize']},
        'angucomplete-alt': { deps: ['angular']},
        'leaflet-directive' : { deps: ['angular','angular-sanitize']},
        'leaflet' : { exports: 'leaflet', deps: ['angular','angular-sanitize']},
        'leaflet.markercluster': { deps: ['angular','angular-sanitize', 'leaflet-directive']},
        'highcharts-ng':{ deps: ['jquery', 'angular']}
    },

    // kick start application
    deps: ['run']
});
