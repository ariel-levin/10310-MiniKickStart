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

        $scope.login = {};
        $scope.register = {};

        $scope.login = function (valid) {
            if (valid) {
                $scope.signedIn = true;

                alert("login success\n"
                    + "\nemail: " + $scope.login.email
                    + "\npass: " + $scope.login.pass);

                $('#loginModal').modal('toggle');
            } else {
                alert("some login form fields are incorrect");
            }
        };

        $scope.logout = function () {
            $scope.signedIn = false;
            alert("logged out success");
        };

        $scope.register = function (valid) {
            if (valid) {
                alert("register success\n"
                    + "\nname: " + $scope.register.firstName + " " + $scope.register.lastName
                    + "\nemail: " + $scope.register.email
                    + "\npass: " + $scope.register.pass);

                $('#registerModal').modal('toggle');
            } else {
                alert("some register form fields are incorrect");
            }
        };

    }
]);