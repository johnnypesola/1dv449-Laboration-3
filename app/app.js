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
                storageMode: 'localStorage',
                maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes.
                cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour.
                recycleFreq: 60 * 1000, // Determines how often a cache will scan for expired items when in aggressive mode. Once every minute
                deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
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