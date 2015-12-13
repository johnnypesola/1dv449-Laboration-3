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

    // App configuration
    MashApp.config(['$routeProvider', 'CacheFactoryProvider', function($routeProvider, CacheFactoryProvider) {

        // Cache settings for $http
        angular.extend(
            CacheFactoryProvider.defaults, {
                maxAge: 15 * 60 * 1000 // 15 minutes
            }
        );

        // Define routes

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