'use strict';

(function(){

  angular.module('MashApp.start',

      // Load Dependencies
      ['MashApp.trafficInfoServices'])

      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/start', {
          templateUrl: 'controllers/start/start.html',
          controller: 'StartCtrl'
        });
      }])

      // Routes for this page
      .config(["$routeProvider", function($routeProvider) {

      }])

      // Controller
      .controller('StartCtrl', ["$scope", "$routeParams", "TrafficInfo", function($scope, $routeParams, TrafficInfo){

          var that = this;

          /* Private methods START */

          /* Private methods END */

          /* Public methods START */

          /* Public methods END */

          /* Initialization START */

          var trafficInfo = TrafficInfo.queryTraffic();

          // In case data cannot be fetched, display an error to user.
          trafficInfo.$promise.catch(function(){

              /*
              $rootScope.FlashMessage = {
                  type: 'error',
                  message: 'Trafikinformationen kunde inte hämtas, var god försök igen.'
              };*/

              $scope.trafficInfo = null;
          });

          $scope.trafficInfo = trafficInfo;

          /* Initialization END */

      }]);
})();