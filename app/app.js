'use strict';

(function(){

  // App Name
  var MashApp;

  // Declare app level module which depends on views, and components
  MashApp = angular.module('MashApp', [
    'ngRoute',
    'MashApp.start'
  ]);

  MashApp.config(['$routeProvider', function($routeProvider) {

    // Declare routes

    // Startpage
    $routeProvider.when('/start', {
          templateUrl: 'controllers/start/start.html',
          controller: 'StartCtrl'
        })

        // Page not found
        .otherwise({
          templateUrl: 'shared/views/notFound.html'
        });
  }]);

})();