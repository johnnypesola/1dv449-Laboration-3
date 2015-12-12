/**
 * Created by jopes on 2015-04-15.
 */
    // Controller

(function(){
    angular.module('MashApp.header',

        // Load Dependencies
        [])

    // Routes for startPage
    .config(["$routeProvider", function($routeProvider) {

    }])

    // Header Controller
    .controller('HeaderCtrl', ["$scope", function($scope){

            // We don't need a menu really. App is too small.

    }])

    // Flash Message Controller
    .controller('FlashMessageCtrl', ["$rootScope", "$scope", function($rootScope, $scope){

        $scope.hideMessage = function(){
            $scope.messageVisible = false;
        };

        $rootScope.$watch('FlashMessage', function(newValue, oldValue) {

            // Check that the value contains data
            if ((typeof(newValue) !== 'undefined') && (newValue !== null) && (typeof newValue.type !== 'undefined')) {
                // Add class
                if(newValue.type === 'error'){
                    $scope.messageClass = 'error';
                }
                if(newValue.type === 'success'){
                    $scope.messageClass = 'success';
                }
                if(newValue.type === 'warning'){
                    $scope.messageClass = 'warning';
                }

                // Add message
                $scope.messageText = newValue.message;
                $scope.messageVisible = true;
            }
        });
    }]);
})();


