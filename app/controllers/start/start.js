'use strict';

(function(){

  angular.module('MashApp.start', ['ngRoute'])

      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/start', {
          templateUrl: 'controllers/start/start.html',
          controller: 'StartCtrl'
        });
      }])

      .controller('StartCtrl', [function() {



      }]);
})();