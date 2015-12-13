'use strict';

(function(){

  angular.module('MashApp.start',

      // Load Dependencies
      [
          'MashApp.trafficInfoServices',
          'ngMap'
      ])

      // Config for module
      .config(['$routeProvider', function($routeProvider) {

            $routeProvider.when('/start', {
                templateUrl: 'controllers/start/start.html',
                controller: 'StartCtrl'
            });
      }])

      // Controller
      .controller('StartCtrl', ["$rootScope", "$scope", "$routeParams", "$timeout", "TrafficInfo", "NgMap", function($rootScope, $scope, $routeParams, $timeout, TrafficInfo, NgMap){

      /* Init variables START */
          var that = this;
          var allTrafficMessagesArray = [];
          var getDataInterval = 1000 * 60 * 5; // Every 5 minutes

          $scope.allTrafficMsgCategories = TrafficInfo.getCategories();
          $scope.currentTrafficMsgCategory = "all";
          $scope.mapValues = {
              center: [62, 16],
              zoom: 5
          };

      /* Init variables END */

      /* Private methods START */

          var getTrafficInfo = function(){

              TrafficInfo.getAll()

              // All went good.
                  .then(function(trafficMessages){

                      allTrafficMessagesArray = trafficMessages;

                      // Display all messages
                      displayMessagesForCategory();

                      // Draw map with markers
                      drawMap();
                  })

              // In case data cannot be fetched, display an error to user.
                  .catch(function(){

                      $rootScope.FlashMessage = {
                          type: 'error',
                          message: 'Trafikinformationen kunde inte hämtas, var god försök igen.'
                      };
                  });
          };

          var displayMessagesForCategory = function() {

              $scope.trafficMessages = [];

              // If category num is between 0 and 4
              if(+$scope.currentTrafficMsgCategory >= 0 && +$scope.currentTrafficMsgCategory <= 4) {

                  allTrafficMessagesArray.forEach(function(message){

                      // If message category is the category that the user wants
                      if(message.category === +$scope.currentTrafficMsgCategory) {

                          // Add message to scope.
                          $scope.trafficMessages.push(message);
                      }
                  });

              }
              else {
                  $scope.trafficMessages = allTrafficMessagesArray;
              }

              // If no items were found, set flag
              $scope.noItemsFound = !$scope.trafficMessages.length;
          };

          var drawMap = function(){

              var messageObj;
              var position;
              NgMap.getMap()

                  .catch(function(error) {

                      $rootScope.FlashMessage = {
                          type: 'error',
                          message: 'Kartan kunde inte hämtas, var god försök igen.'
                      };
                  });
          };

          that.runMethodInIntervals = function(methodToRun){

              // Replicate setInterval using $timeout service.

              $timeout(function() {
                  methodToRun();
                  that.runMethodInIntervals(methodToRun); // Call itself
              }, getDataInterval)
          };

      /* Private methods END */

      /* Public methods START */

          $scope.changeToTrafficMsgCategory = function(categoryNum){

              $scope.currentTrafficMsgCategory = categoryNum.toString();

              displayMessagesForCategory();
          };

          $scope.setSpecificTrafficMsg = function(trafficMessage){

              $scope.currentSpecificTrafficMsg = trafficMessage;
          };

          $scope.highlightTrafficMessage = function(trafficMessage){

              $scope.hightlightedTrafficMsg = trafficMessage;
          };

      /* Public methods END */

      /* Initialization START */

          getTrafficInfo();
          that.runMethodInIntervals(getTrafficInfo);

      /* Initialization END */

      }]);
})();