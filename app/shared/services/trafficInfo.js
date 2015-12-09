/**
 * Created by jopes on 2015-12-09.
 */

(function(){
    // Declare module
    angular.module('MashApp.trafficInfoServices',

        // Dependencies
        [
            'ngResource'
        ])

        .factory('TrafficInfo', ["$resource", "TRAFFIC_INFO_API_URL", function($resource, TRAFFIC_INFO_API_URL){

            return $resource(
                TRAFFIC_INFO_API_URL,
                {},
                {
                    queryTraffic: {
                        url: TRAFFIC_INFO_API_URL,
                        id: '@id',
                        method: 'GET',
                        params: {
                            format: 'json'
                        }
                    }
                }
            );
        }])
})();
