'use strict';

(function(){

  angular.module('MashApp.start',

      // Load Dependencies
      [
          'MashApp.trafficInfoServices',
          //'uiGmapgoogle-maps' // Google maps API | This is the other wrapper that we first used
          'ngMap' // The new wrapper
      ])

      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/start', {
          templateUrl: 'controllers/start/start.html',
          controller: 'StartCtrl'
        });
      }])

      // Config for module
      .config(["$routeProvider", function($routeProvider) {

      }])

      // Controller
      .controller('StartCtrl', ["$scope", "$routeParams", "TrafficInfo", "NgMap", function($scope, $routeParams, TrafficInfo, NgMap){

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
              if($scope.currentTrafficMsgCategory >= 0 && $scope.currentTrafficMsgCategory <= 4) {


                  for (message in allTrafficMessagesArray) {

                      // If message category is the category that the user wants
                      if(message.category === $scope.currentTrafficMsgCategory) {

                          // Add message to scope.
                          $scope.trafficMessages.push(message);
                      }
                  }
              }
              else {
                  $scope.trafficMessages = allTrafficMessagesArray;
              }
          };

          var drawMap = function(){

              var messageObj;
              var position;
              NgMap.getMap()

                  .then(function(map) {
                      console.log(map.getCenter());

                      console.log('markers', map.markers);
                      console.log('shapes', map.shapes);
                      console.log("drawMap done");

                })

                  .catch(function(error) {
                      console.log(error);
                  });

          };


          /* Private methods END */

          /* Public methods START */

          $scope.changeToTrafficMsgCategory = function(categoryNum){

              $scope.currentTrafficMsgCategory = categoryNum;

              displayMessagesForCategory();
          };

          /* Public methods END */

          /* Initialization START */

          getTrafficInfo();

          drawMap();

          /* Initialization END */

      }]);
})();