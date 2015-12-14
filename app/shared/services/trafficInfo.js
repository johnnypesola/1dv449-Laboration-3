/**
 * Created by jopes on 2015-12-09.
 */

(function(){
    // Declare module
    angular.module('MashApp.trafficInfoServices',

        // Dependencies
        ['angular-cache']
    )
        .factory('TrafficInfo', ["$http", "$q", "CacheFactory", function($http, $q, CacheFactory){

        /* Init Variables START */

            var apiUrl = 'http://api.sr.se/api/v2/traffic/messages/',
                messagesToGet = 100,
                pageEntryCount = 12,
                serviceMethods = {},
                cacheName = 'trafficInfoCache',
                cachedData;

        /* Init Variables END */

        /* Private Methods START */

            var setupCache = function(){

                // If cache does not exist, create it.
                if (!CacheFactory.get(cacheName)) {

                    CacheFactory.createCache(cacheName);
                }

                // Get data from cache
                cachedData = CacheFactory.get(cacheName)
            };

            var parseDate = function(dateStr){
                return new Date(parseInt(dateStr.substr(6)));
            };

            var totalPagesNum = 0;

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

            serviceMethods.getAll = function(pageNumber){

                var deferred, trafficMessagesToReturnArray = [],
                    startEntryIndex, endEntryIndex;

                // Create promise
                deferred = $q.defer();

                // Fetch api result
                $http.get(apiUrl, {
                    cache: cachedData,
                    params: {
                        format: 'json',
                        sort: 'createddate',
                        size: messagesToGet
                    }
                })

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

                        // Update total pages variable
                        totalPagesNum = Math.ceil(trafficMessagesToReturnArray.length / pageEntryCount);

                            // Apply slicing to results with pagenum
                        startEntryIndex = pageEntryCount * (pageNumber - 1);
                        endEntryIndex = pageEntryCount * pageNumber;

                        // Slice entries
                        trafficMessagesToReturnArray = trafficMessagesToReturnArray.slice(startEntryIndex, endEntryIndex);

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

            serviceMethods.getTotalPages = function(){
                return totalPagesNum;
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

        /* Initialization START */

            setupCache();

        /* Initialization END */

            return serviceMethods;
        }])
})();
