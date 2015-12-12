/**
 * Created by jopes on 2015-12-09.
 */

(function(){
    // Declare module
    angular.module('MashApp.trafficInfoServices',

        // Dependencies
        [])


        .factory('TrafficInfo', ["$http", function($http){

            // Each message has the following unique values
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


            // Define variables used in service
            var apiUrl = 'http://api.sr.se/api/v2/traffic/messages/?format=json';
            var serviceMethods = {};

            // Define methods available for this service
            serviceMethods.getAll = function(){
                return $http.get(apiUrl);
            };

            return serviceMethods;
        }]);
})();
