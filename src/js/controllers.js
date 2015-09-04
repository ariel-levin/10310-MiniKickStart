var kickstartControllers = angular.module('kickstartControllers', []);

kickstartControllers.controller('mainCtrl', function ($scope, $log, ApiService, $route, $filter) {

        var DEBUG = true;

        $scope.main = {};

        $scope.main.searchText = "";
        $scope.user = {};


        var resetFormFields = function () {
            $scope.login = {};
            $scope.register = {};
            $scope.newProject = {};
            $scope.editProject = {};
            $scope.newProject.endDateField = new Date();
            $scope.newProject.endDateField.setDate($scope.newProject.endDateField.getDate() + 1);
            $scope.newProject.endDateField.setSeconds(0,0);
            $scope.newProject.minDate = $scope.newProject.endDateField.toISOString();
        };

        resetFormFields();


        $scope.loadProjectList = function() {
            ApiService.getProjectList()
                .then(function getProjectListSuccess(res) {
                    $log.debug("mainCtrl: getProjectList success: " + res);
                    $scope.projectList = res;

                    $scope.projectList.forEach(function (p) {
                        $scope.getProjectTimeData(p);
                    });

                    if ($scope.user.signed && $scope.user.UserAuthLvl == 0) {
                        $scope.user.projects = $scope.projectList;
                    }

                }, function getProjectListError(reason) {
                    $log.error("mainCtrl: getProjectList failed. reason: ", reason);
                });
        };

        $scope.loadProjectList();


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

        $scope.newProjectRequest = function (valid) {
            if (valid) {
                $scope.createNewProject();
            } else {
                alert("some new project form fields are incorrect");
            }
        };

        $scope.editProjectRequest = function (valid) {
            if (valid) {
                editProject();
            } else {
                alert("some edit project form fields are incorrect");
            }
        };

        $scope.logoutRequest = function () {
            $scope.user = {};
            alert("logged out success");
            resetFormFields();
        };


        $scope.toggleModal = function (modal, type, object) {
            if (type === "project") {
                fillProjectModalDetails(object);

            } else if (type === "user") {
                fillUserModalDetails(object);

            }
            $(modal).modal('toggle');
        };


        $scope.userLogin = function(isRegistered) {
            ApiService.userLogin($scope.login)
                .then(function userLoginSuccess(res) {
                    $log.debug("mainCtrl: userLogin success: " + res);

                    $scope.user = res;
                    $scope.user.signed = true;

                    if ($scope.user.UserAuthLvl == 0) {
                        $scope.user.projects = $scope.projectList;

                    } else if ($scope.user.UserAuthLvl == 1) {
                        $scope.getUserProjects();
                        $scope.getUserInvestments();

                    } else if ($scope.user.UserAuthLvl == 2) {
                        $scope.getUserInvestments();
                    }

                    if (!isRegistered) {
                        $('#loginModal').modal('toggle');
                    }
                    resetFormFields();

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
                    resetFormFields();

                }, function userRegisterError(reason) {
                    $log.error("mainCtrl: userRegister failed. reason: ", reason);
                });
        };

        $scope.createNewProject = function() {

            $scope.newProject.owner = $scope.user.UserName;
            $scope.newProject.endDateField.setHours($scope.newProject.endDateField.getHours() + 3);
            $scope.newProject.endDate = $scope.newProject.endDateField.toISOString();

            ApiService.createNewProject($scope.newProject)
                .then(function createNewProjectSuccess(res) {

                    if ($scope.newProject.mainPic) {
                        uploadProjectMainPic(res, false);

                    } else if ($scope.newProject.pics) {
                        uploadProjectPics(res, false);

                    } else {
                        $log.debug("mainCtrl: createNewProject success: " + res);
                        finishedCreatingProject(false);
                    }

                }, function createNewProjectError(reason) {
                    $log.error("mainCtrl: createNewProject failed. reason: ", reason);
                });
        };

        var editProject = function() {

            if (!$scope.editProject.video || $scope.editProject.video.length <= 0) {
                $scope.editProject.video = undefined;
            }

            ApiService.editProject($scope.editProject)
                .then(function editProjectSuccess(res) {

                    if ($scope.editProject.mainPic) {
                        uploadProjectMainPic($scope.editProject.id, true);

                    } else if ($scope.editProject.pics) {
                        uploadProjectPics($scope.editProject.id, true);

                    } else {
                        $log.debug("mainCtrl: editProject success: " + res);
                        finishedCreatingProject(true);
                    }

                }, function editProjectError(reason) {
                    $log.error("mainCtrl: editProject failed. reason: ", reason);
                });
        };

        var deleteProject = function(pid) {

            ApiService.deleteProject(pid)
                .then(function editProjectSuccess(res) {

                    $log.debug("mainCtrl: deleteProject success: " + res);
                    alert("Deleted project successfully");
                    refreshProjects();

                }, function editProjectError(reason) {
                    $log.error("mainCtrl: deleteProject failed. reason: ", reason);
                });
        };

        $scope.getUserProjects = function () {
            ApiService.getUserProjects($scope.user.UserName)
                .then(function getUserProjectsSuccess(res) {
                    $log.debug("mainCtrl: getUserProjects success: " + res);
                    $scope.user.projects = res;

                    $scope.user.projects.forEach(function(p) {
                        $scope.getProjectTimeData(p);
                    });

                }, function getUserProjectsError(reason) {
                    $log.error("mainCtrl: getUserProjects failed. reason: ", reason);
                });
        };

        $scope.getUserInvestments = function () {
            ApiService.getUserInvestments($scope.user.UserName)
                .then(function getUserInvestmentsSuccess(res) {
                    $log.debug("mainCtrl: getUserInvestments success: " + res);
                    $scope.user.investments = res;

                    $scope.user.investments.forEach(function(p) {
                        $scope.getProjectTimeData(p);
                    });

                }, function getUserInvestmentsError(reason) {
                    $log.error("mainCtrl: getUserInvestments failed. reason: ", reason);
                });
        };

        $scope.getProjectTimeData = function (project) {
            project.daysLeft = Math.round(parseInt((project.milliSec / 1000) / 86400));
            project.fundPercent = Math.round((project.moneybacked / project.AmountNeeded) * 100);
            project.fundPercentWidth = Math.min(project.fundPercent, 100);
        };

        $scope.getActiveProjectCount = function () {
            if ($scope.projectList) {
                return $filter('filter')($scope.projectList, {Active: 1}).length;

            } else {
                return 0;
            }
        };

        $scope.deleteProjectRequest = function (pid) {
            var result = confirm("Are you sure you want to delete this project?");

            if (result) {
                deleteProject(pid);
            }
        };

        var refreshProjects = function() {
            $scope.loadProjectList();
            if ($scope.user.UserAuthLvl == 1) {
                $scope.getUserProjects();
                $scope.getUserInvestments();
            } else if ($scope.user.UserAuthLvl == 2) {
                $scope.getUserInvestments();
            }
            $route.reload();
        };

        var uploadProjectMainPic = function (pid, editMode) {

            var mainPic = (editMode) ? $scope.editProject.mainPic : $scope.newProject.mainPic ;
            var pics = (editMode) ? $scope.editProject.pics : $scope.newProject.pics ;

            ApiService.uploadProjectMainPic(mainPic, pid)
                .then(function uploadProjectMainPicSuccess(res) {
                    $log.debug("mainCtrl: uploadProjectMainPic success: " + res);

                    if (pics) {
                        uploadProjectPics(pid, editMode);
                    } else {
                        finishedCreatingProject(editMode);
                    }

                }, function uploadProjectMainPicError(reason) {
                    $log.error("mainCtrl: uploadProjectMainPic failed. reason: ", reason);
                    alert("invalid project main picture");
                });
        };

        var uploadProjectPics = function (pid, editMode) {

            var pics = (editMode) ? $scope.editProject.pics : $scope.newProject.pics ;

            ApiService.uploadProjectPics(pics, pid)
                .then(function uploadProjectMainPicSuccess(res) {

                    $log.debug("mainCtrl: uploadProjectPics success: " + res);
                    finishedCreatingProject(editMode);

                }, function uploadProjectMainPicError(reason) {
                    $log.error("mainCtrl: uploadProjectPics failed. reason: ", reason);
                    alert("invalid project pictures");
                });
        };

        var finishedCreatingProject = function(editMode) {
            $log.debug("mainCtrl: finishedCreatingProject success");
            if (editMode) {
                alert("Edited project successfully");
                $('#editProjectModal').modal('toggle');

            } else {
                alert("Created new project successfully");
                $('#newProjectModal').modal('toggle');
            }
            resetFormFields();
            refreshProjects();
        };

        var fillProjectModalDetails = function (project) {
            $scope.editProject.id = project.id;
            $scope.editProject.name = project.name;
            $scope.editProject.desc = project.description;
            if (project.VideoYouTubeID === 'undefined' || project.VideoYouTubeID.length == 0) {
                $scope.editProject.video = undefined;
            } else {
                $scope.editProject.video = project.VideoYouTubeID;
            }
        }

        var fillUserModalDetails = function (user) {

        }





        if (DEBUG) {
            $scope.login.email = "a@b.c";               // admin
            //$scope.login.email = "a@a.a";             // project manager
            //$scope.login.email = "asd@asd.asd";       // project manager
            $scope.login.pass = "123123";
            $scope.userLogin(true);
        }

    }
);


kickstartControllers.controller('projectCtrl', function ($scope, $log, ApiService, $routeParams, $sce) {

        $scope.project = {};
        $scope.project.id = $routeParams.projectId;
        $scope.backersVisible = false;


        ApiService.getProject($scope.project.id)
            .then(function getProjectSuccess(res) {
                $log.debug("projectCtrl: getProject success: " + res);
                $scope.project = res;

                if (res.pics.length == 0) {
                    res.pics = undefined;
                }

                $scope.project.amountCollected = 0;
                $scope.project.backers.forEach(function(entry) {
                    $scope.project.amountCollected += entry.Amount;
                });

                $scope.project.fundPercent = Math.round(($scope.project.amountCollected / $scope.project.AmountNeeded) * 100);
                $scope.project.fundPercentWidth = Math.min($scope.project.fundPercent, 100);

            }, function getProjectError(reason) {
                $log.error("projectCtrl: getProject failed. reason: ", reason);
            });


        angular.element(document).ready(function () {

            var days, hours, minutes, seconds;
            var countdown = document.getElementById('timerSpan');
            var interval = 0;

            setInterval(function () {

                var seconds_left = ($scope.project.timeLeft.milliSec / 1000) - interval;

                days = parseInt(seconds_left / 86400);
                seconds_left = seconds_left % 86400;

                hours = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;

                minutes = parseInt(seconds_left / 60);
                seconds = parseInt(seconds_left % 60);

                countdown.innerHTML = '<span class="days">' + days +  ' <b>Days,</b></span> <span class="hours">' +
                    hours + ' <b>Hours,</b></span> <span class="minutes">' + minutes +
                    ' <b>Minutes</b></span> <span class="seconds">' + seconds + ' <b>Seconds</b></span>';

                interval++;

            }, 1000);
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

        $scope.getTrustedSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.getYouTubeEmbedURL = function() {
            if ($scope.project.VideoYouTubeID && $scope.project.VideoYouTubeID !== "") {
                var url = "https://www.youtube.com/embed/" + $scope.project.VideoYouTubeID;
                return $scope.getTrustedSrc(url);
            } else {
                return null;
            }
        };

        $scope.showBackers = function() {
            $scope.backersVisible = ($scope.backersVisible) ? false : true;
        };

    }
);