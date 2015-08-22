var kickstartApp = angular.module('kickstartApp', [
    'ngRoute',
    'kickstartControllers',
    'kickstartServices'
]);

kickstartApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/main', {
                templateUrl: 'partials/main.html',
                controller: 'mainCtrl'
            }).
            otherwise({
                redirectTo: '/main'
            });
    }
]);

kickstartApp.controller('AppCtrl', ['$scope', 'User',
    function ($scope, User) {

        $scope.signedIn = false;

        $scope.login = function () {
            $scope.signedIn = true;
            alert("logged in");
        };

        $scope.logout = function () {
            $scope.signedIn = false;
            alert("logged out");
        };

    }
]);