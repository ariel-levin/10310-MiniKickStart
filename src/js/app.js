var kickstartApp = angular.module('kickstartApp', [
    'ngRoute',
    'kickstartControllers',
    'kickstartServices',
    'ngStorage'
]);

kickstartApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider.
            when('/main', {
                templateUrl: 'partials/main.html',
                controller: 'mainCtrl'
            }).
            otherwise({
                redirectTo: '/main'
            });

        $httpProvider.defaults.withCredentials = true;
    }
]);

kickstartApp.controller('AppCtrl', function ($scope, $log, ApiService) {

        $scope.main = {};
        $scope.main.signedIn = false;
        $scope.main.authLvl = -1;


        $scope.resetFormFields = function () {
            $scope.login = {};
            $scope.register = {};
        };

        $scope.resetFormFields();


        ApiService.getTopProjects()
            .then(function getTopProjectsSuccess(res) {
                $log.debug("AppCtrl: getTopProjects success: " + res);
                $scope.topProjects = res;
            }, function getTopProjectsError(reason) {
                $log.error("AppCtrl: getTopProjects failed. reason: ", reason);
            });


        $scope.loginRequest = function (valid) {
            if (valid) {
                $scope.userLogin(false);
            } else {
                alert("some login form fields are incorrect");
            }
        };

        $scope.registerRequest = function (valid) {
            if (valid) {
                $scope.userRegister();
            } else {
                alert("some register form fields are incorrect");
            }
        };

        $scope.logoutRequest = function () {
            $scope.main.signedIn = false;
            alert("logged out success");
            $scope.resetFormFields();
        };


        $scope.userLogin = function(isRegistered) {
            ApiService.userLogin($scope.login)
                .then(function userLoginSuccess(res) {
                    $log.debug("AppCtrl: userLogin success: " + res);

                    $scope.main.signedIn = true;
                    $scope.main.authLvl = res.UserAuthLvl;
                    alert("Login Success!\n"
                        + "\nUserName: " + res.UserName
                        + "\nUserAuthLvl: " + res.UserAuthLvl);

                    if (!isRegistered) {
                        $('#loginModal').modal('toggle');
                    }
                    $scope.resetFormFields();

                }, function userLoginError(reason) {
                    $log.error("AppCtrl: userLogin failed. reason: ", reason);
                });
        };

        $scope.userRegister = function() {
            ApiService.userRegister($scope.register)
                .then(function userRegisterSuccess(res) {
                    $log.debug("AppCtrl: userRegister success: " + res);
                    alert(res);
                    $scope.login.email = $scope.register.email;
                    $scope.login.pass = $scope.register.pass;
                    $scope.userLogin(true);
                    $('#registerModal').modal('toggle');
                    $scope.resetFormFields();

                }, function userRegisterError(reason) {
                    $log.error("AppCtrl: userRegister failed. reason: ", reason);
                });
        };

    }
);