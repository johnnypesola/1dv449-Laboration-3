'use strict';

(function(){

    // App Name
    var MashApp;

    // Declare app level module which depends on some views and components
    MashApp = angular.module('MashApp', [
        'ngRoute',
        'ngResource',
        'MashApp.header',
        'MashApp.start'
    ]);


    // Define routes
    MashApp.config(['$routeProvider', function($routeProvider) {

        // Set Startpage
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