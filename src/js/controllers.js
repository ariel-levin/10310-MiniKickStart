var kickstartControllers = angular.module('kickstartControllers', []);

kickstartControllers.controller('mainCtrl', function ($scope, $log, ApiService) {

        $scope.main = {};

        $scope.main.user = {};
        $scope.main.user.signed = false;
        $scope.main.user.authLvl = -1;


        $scope.resetFormFields = function () {
            $scope.login = {};
            $scope.register = {};
        };

        $scope.resetFormFields();


        ApiService.getTopProjects()
            .then(function getTopProjectsSuccess(res) {
                $log.debug("mainCtrl: getTopProjects success: " + res);
                $scope.topProjects = res;
            }, function getTopProjectsError(reason) {
                $log.error("mainCtrl: getTopProjects failed. reason: ", reason);
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
            $scope.main.user = {};
            alert("logged out success");
            $scope.resetFormFields();
        };


        $scope.toggleModal = function (modal) {
            $(modal).modal('toggle');
        };


        $scope.userLogin = function(isRegistered) {
            ApiService.userLogin($scope.login)
                .then(function userLoginSuccess(res) {
                    $log.debug("mainCtrl: userLogin success: " + res);

                    $scope.main.user.signed = true;
                    $scope.main.user.id = res.UserName;
                    $scope.main.user.authLvl = res.UserAuthLvl;

                    //alert("Login Success!\n"
                    //    + "\nUserName: " + res.UserName
                    //    + "\nUserAuthLvl: " + res.UserAuthLvl);

                    if (!isRegistered) {
                        $('#loginModal').modal('toggle');
                    }
                    $scope.resetFormFields();

                }, function userLoginError(reason) {
                    $log.error("mainCtrl: userLogin failed. reason: ", reason);
                });
        };

        $scope.userRegister = function() {
            ApiService.userRegister($scope.register)
                .then(function userRegisterSuccess(res) {
                    $log.debug("mainCtrl: userRegister success: " + res);
                    //alert(res);
                    $scope.login.email = $scope.register.email;
                    $scope.login.pass = $scope.register.pass;
                    $scope.userLogin(true);
                    $('#registerModal').modal('toggle');
                    $scope.resetFormFields();

                }, function userRegisterError(reason) {
                    $log.error("mainCtrl: userRegister failed. reason: ", reason);
                });
        };
    }
);


kickstartControllers.controller('projectCtrl', function ($scope, $log, ApiService, $routeParams) {

        $scope.project = {};
        $scope.project.id = $routeParams.projectId;

        ApiService.getProject($scope.project.id)
            .then(function getTopProjectsSuccess(res) {
                $log.debug("projectCtrl: getProject success: " + res);
                $scope.project = res;

            }, function getTopProjectsError(reason) {
                $log.error("projectCtrl: getProject failed. reason: ", reason);
            });

        // controller for the project image gallery
        document.getElementById('projectImages').onclick = function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {index: link, event: event},
                links = this.getElementsByTagName('a');
            blueimp.Gallery(links, options);
        };

    }
);