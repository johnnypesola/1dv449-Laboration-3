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
      .controller('StartCtrl', ["$rootScope", "$scope", "$routeParams", "TrafficInfo", "NgMap", function($rootScope, $scope, $routeParams, TrafficInfo, NgMap){

      /* Init variables */
          var that = this;
          var allTrafficMessagesArray = [];
          $scope.allTrafficMsgCategories = TrafficInfo.getCategories();
          $scope.currentTrafficMsgCategory = "all";

      /* Private methods START */

          var getTrafficInfo = function(){

              TrafficInfo.getAll()

              // All went good.
                  .success(function(trafficMessages){

                      allTrafficMessagesArray = trafficMessages.messages;

                      // Display all messages
                      displayMessagesForCategory();

                      // Draw map with markers
                      drawMap();
                  })

              // In case data cannot be fetched, display an error to user.
                  .error(function(){

                      $rootScope.FlashMessage = {
                          type: 'error',
                          message: 'Trafikinformationen kunde inte hämtas, var god försök igen.'
                      };
                  });
          };

          var displayMessagesForCategory = function() {

              var message;
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


      /* Private methods END */

      /* Public methods START */

          $scope.changeToTrafficMsgCategory = function(categoryNum){

              $scope.currentTrafficMsgCategory = categoryNum.toString();

              displayMessagesForCategory();
          };

          $scope.setSpecificTrafficMsg = function(trafficMessage){

              $scope.currentSpecificTrafficMsg = trafficMessage;
          };

      /* Public methods END */

      /* Initialization START */

          getTrafficInfo();

      /* Initialization END */

      }]);
})();