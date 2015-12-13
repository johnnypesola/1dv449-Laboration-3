/**
 * Created by jopes on 2015-12-09.
 */

(function(){
    // Declare module
    angular.module('MashApp.trafficInfoServices',

        // Dependencies
        ['angular-cache']
    )
        .factory('TrafficInfo', ["$http", "$q", function($http, $q){

        /* Init Variables START */

            var apiUrl = 'http://api.sr.se/api/v2/traffic/messages/?format=json';
            var serviceMethods = {};

        /* Init Variables END */

        /* Private Methods START */

            var parseDate = function(dateStr){
                return new Date(parseInt(dateStr.substr(6)));
            };

        /* Private Methods END */

        /* Public Methods START */

            // Example of a JSON response from API
            /*
             {
             "id":1539416,
             "priority":5,
             "createddate":"/Date(1447764180897+0100)/",
             "title":"Rv 84 Sörsforsa-Delsbo",
             "exactlocation":"Vid avfarten Näsviken",
             "description":"",
             "latitude":61.74943542480469,
             "longitude":16.835500717163086,
             "category":0,
             "subcategory":"Vägarbete"
             }
             */

            serviceMethods.getAll = function(){

                var deferred, trafficMessagesToReturnArray = [];

                // Create promise
                deferred = $q.defer();

                // Fetch api result
                $http.get(apiUrl)

                    // All went good.
                    .success(function(response){

                        response.messages.forEach(function(msg){

                            // Parse date variables
                            msg.createddate = parseDate(msg.createddate);

                            trafficMessagesToReturnArray.push(msg);
                        });

                        // Sort results after createddate
                        trafficMessagesToReturnArray.sort(function(a,b){
                            return new Date(b.createddate) - new Date(a.createddate);
                        });

                        // Return parsed array
                        deferred.resolve(trafficMessagesToReturnArray);
                    })

                    // In case data cannot be fetched
                    .error(function(){

                        deferred.reject();
                    });


                // Return promise
                return deferred.promise;
            };

            serviceMethods.getCategories = function(){
                return {
                    0: "Vägtrafik",
                    1: "Kollektivtrafik",
                    2: "Planerad störning",
                    3: "Övrigt"
                }
            };

        /* Public Methods END */

            return serviceMethods;
        }])
})();
