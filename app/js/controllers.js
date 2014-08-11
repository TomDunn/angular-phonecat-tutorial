'use strict';

/* Controllers */

(function() {

    var phonecatControllers = angular.module('phonecatControllers', []);

    phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http', 'Phone', function($scope, $http, Phone) {
        $scope.orderProp    = 'age';
        $scope.name         = "Thomas";
        // Phone.query() returns a future, no callback necessary
        $scope.phones       = Phone.query();
    }]);

    phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http', 'Phone', function($scope, $routeParams, $http, Phone) {
        $scope.phoneId = $routeParams.phoneId;

        $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
            $scope.mainImageUrl = phone.images[0];
        });

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }]);

})();
