'use strict';

(function(){

    // App Name
    var MashApp;

    // Declare app level module which depends on some views and components
    MashApp = angular.module('MashApp', [
        'ngRoute',
        'ngResource',
        'MashApp.start'
    ]);


    // Define API URL:s, used in services
    MashApp.constant('TRAFFIC_INFO_API_URL', 'http://api.sr.se/api/v2/traffic/messages');

    // Define routes
    MashApp.config(['$routeProvider', function($routeProvider) {

        // Startpage
        $routeProvider.when('/', {
            templateUrl: 'controllers/start/start.html',
            controller: 'StartCtrl'
        })

        // Page not found
        .otherwise({
            templateUrl: 'shared/views/notFound.html'
        });
    }]);

})();