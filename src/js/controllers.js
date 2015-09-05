/*
 * Ariel Levin
 * ariel.lvn89@gmail.com , http://about.me/ariel.levin
 *
 * Yoni Maymon
 * yoni116@gmail.com
 *
 * */


var kickstartControllers = angular.module('kickstartControllers', []);

kickstartControllers.controller('mainCtrl', function ($scope, $log, ApiService, $route, $filter, $location) {

        var resetFormFields = function () {
            $scope.login = {};
            $scope.register = {};
            $scope.register.gender = "Male";
            $scope.register.auth = '2';
            $scope.editUser = {};
            $scope.editCurrentUser = {};
            $scope.newProject = {};
            $scope.editProject = {};
            $scope.newProject.endDateField = new Date();
            $scope.newProject.endDateField.setDate($scope.newProject.endDateField.getDate() + 1);
            $scope.newProject.endDateField.setSeconds(0,0);
            $scope.newProject.minDate = $scope.newProject.endDateField.toISOString();
        };

        resetFormFields();


        var loadProjectList = function() {
            ApiService.getProjectList()
                .then(function getProjectListSuccess(res) {
                    $log.debug("mainCtrl: getProjectList success: " + res);
                    $scope.projectList = res;

                    $scope.projectList.forEach(function (p) {
                        getProjectTimeData(p);
                    });

                    if ($scope.user && $scope.user.signed && $scope.user.UserAuthLvl == 0) {
                        $scope.user.projects = $scope.projectList;
                    }

                }, function getProjectListError(reason) {
                    $log.error("mainCtrl: getProjectList failed. reason: ", reason);
                });
        };

        loadProjectList();


        $scope.loginRequest = function (valid) {
            if (valid) {
                userLogin(false);
            } else {
                alert("some login form fields are incorrect");
            }
        };

        $scope.registerRequest = function (valid) {
            if (valid) {
                userRegister();
            } else {
                alert("some register form fields are incorrect");
            }
        };

        $scope.newProjectRequest = function (valid) {
            if (valid) {
                createNewProject();
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

        $scope.editUserRequest = function (valid) {
            if (valid) {
                editUser();
            } else {
                alert("some edit user form fields are incorrect");
            }
        };


        $scope.editCurrentUserRequest = function (valid) {
            if (valid) {
                editCurrentUser();
            } else {
                alert("some edit user form fields are incorrect");
            }
        };

        $scope.logoutRequest = function (userEdited) {
            ApiService.removeUserSession();
            $scope.user = {};
            if (userEdited) {
                alert("Your info was edited successfully, please login again");
            } else {
                alert("Logged out successfully");
            }
            resetFormFields();
            refreshProjects();
            $location.url('/main');
        };


        $scope.toggleModal = function (modal, type, object) {
            if (type === "project") {
                fillProjectModalDetails(object);

            } else if (type === "user") {
                fillUserModalDetails(object);

            }
            $(modal).modal('toggle');
        };

        $scope.showMyInvestments = function () {
            refreshProjects();
            $location.url('/myInvestments/' + $scope.user.Id);
        };


        var userLogin = function(isRegistered) {
            ApiService.userLogin($scope.login)
                .then(function userLoginSuccess(res) {
                    $log.debug("mainCtrl: userLogin success: " + res);

                    $scope.user = res;
                    $scope.user.signed = true;

                    if ($scope.user.UserAuthLvl == 0) {
                        $scope.user.projects = $scope.projectList;
                        getAllUsers();

                    } else if ($scope.user.UserAuthLvl == 1) {
                        getUserProjects();
                        getUserInvestments();

                    } else if ($scope.user.UserAuthLvl == 2) {
                        getUserInvestments();
                    }

                    if (!isRegistered) {
                        $('#loginModal').modal('toggle');
                    }
                    resetFormFields();

                }, function userLoginError(reason) {
                    $log.error("mainCtrl: userLogin failed. reason: ", reason);
                    alert("one or both of the fields are incorrect");
                });
        };

        var userRegister = function() {
            ApiService.userRegister($scope.register)
                .then(function userRegisterSuccess(res) {
                    $log.debug("mainCtrl: userRegister success: " + res);
                    $scope.login.email = $scope.register.email;
                    $scope.login.pass = $scope.register.pass;
                    userLogin(true);
                    $('#registerModal').modal('toggle');
                    resetFormFields();

                }, function userRegisterError(reason) {
                    $log.error("mainCtrl: userRegister failed. reason: ", reason);
                    alert("something went wrong with register form, please try again")
                });
        };

        var createNewProject = function() {

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

        var getUserProjects = function () {
            ApiService.getUserProjects($scope.user.UserName)
                .then(function getUserProjectsSuccess(res) {
                    $log.debug("mainCtrl: getUserProjects success: " + res);
                    $scope.user.projects = res;

                    $scope.user.projects.forEach(function(p) {
                        getProjectTimeData(p);
                    });

                }, function getUserProjectsError(reason) {
                    $log.error("mainCtrl: getUserProjects failed. reason: ", reason);
                });
        };

        var getUserInvestments = function () {
            ApiService.getUserInvestments($scope.user.UserName)
                .then(function getUserInvestmentsSuccess(res) {
                    $log.debug("mainCtrl: getUserInvestments success: " + res);
                    $scope.user.investments = res;

                    $scope.user.investments.forEach(function(p) {
                        getProjectTimeData(p);
                    });

                }, function getUserInvestmentsError(reason) {
                    $log.error("mainCtrl: getUserInvestments failed. reason: ", reason);
                });
        };

        var getProjectTimeData = function (project) {
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

        $scope.changeUserStatusRequest = function (userId, status) {
            if (userId == $scope.user.UserName) {
                alert("You cannot deactivate your own user");
                return;
            }

            if (status == 1) {
                var result = confirm("Are you sure you want to deactivate this user?");
            } else {
                var result = confirm("Are you sure you want to activate this user?");
            }

            if (result) {
                changeUserStatus(userId, status);
            }
        };

        var refreshProjects = function() {
            loadProjectList();
            if ($scope.user.UserAuthLvl == 1) {
                getUserProjects();
                getUserInvestments();
            } else if ($scope.user.UserAuthLvl == 2) {
                getUserInvestments();
            }
            $route.reload();
        };

        var refreshAllUsers = function() {
            if ($scope.user.UserAuthLvl == 0) {
                getAllUsers();
            }
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
        };

        var fillUserModalDetails = function (user) {
            $scope.editUser.email = user.UserName;

            if (user.FirstName && user.FirstName.length > 0) {
                $scope.editUser.firstName = user.FirstName;
            } else {
                $scope.editUser.firstName = undefined;
            }

            if (user.LastName && user.LastName.length > 0) {
                $scope.editUser.lastName = user.LastName;
            } else {
                $scope.editUser.lastName = undefined;
            }

            if (user.Gender && user.Gender.length > 0) {
                $scope.editUser.gender = user.Gender;
            } else {
                $scope.editUser.gender = "Male";
            }

            $scope.editUser.auth = user.UserAuthLvl;
            $scope.editUser.pass = undefined;
        };



        $scope.toggleAccountInfoModal = function (uid) {

            if (!uid || uid.length <= 0) {
                alert("some error occurred, please login again");
                return;
            }

            $log.debug("toggleAccountInfoModal: uid = " + uid);

            ApiService.getUserDetails(uid)
                .then(function getUserDetailsSuccess(user) {
                    $log.debug("mainCtrl: toggleAccountInfoModal success: " + user);

                    $scope.editCurrentUser.email = user.UserName;

                    if (user.FirstName && user.FirstName.length > 0) {
                        $scope.editCurrentUser.firstName = user.FirstName;
                        $scope.user.FirstName = user.FirstName;
                    } else {
                        $scope.editCurrentUser.firstName = undefined;
                        $scope.user.FirstName = undefined
                    }

                    if (user.LastName && user.LastName.length > 0) {
                        $scope.editCurrentUser.lastName = user.LastName;
                        $scope.user.LastName = user.LastName;
                    } else {
                        $scope.editCurrentUser.lastName = undefined;
                        $scope.user.LastName = undefined;
                    }

                    if (user.Gender && user.Gender.length > 0) {
                        $scope.editCurrentUser.gender = user.Gender;
                        $scope.user.Gender = user.Gender;
                    } else {
                        $scope.editCurrentUser.gender = "Male";
                        $scope.user.Gender = undefined;
                    }

                    $scope.editCurrentUser.auth = user.UserAuthLvl;
                    $scope.editCurrentUser.pass = undefined;

                    $('#editCurrentUserModal').modal('toggle');

                }, function getUserDetailsError(reason) {
                    $log.error("mainCtrl: toggleAccountInfoModal failed. reason: ", reason);
                });
        };

        var getAllUsers = function () {
            ApiService.getAllUsers()
                .then(function getAllUsersSuccess(res) {
                    $log.debug("mainCtrl: getAllUsers success: " + res);

                    $scope.user.allUsers = res;
                    $route.reload();

                }, function getAllUsersError(reason) {
                    $log.error("mainCtrl: getAllUsers failed. reason: ", reason);
                });
        };

        var editUser = function() {

            if (!$scope.editUser.pass || $scope.editUser.pass <= 0) {
                $scope.editUser.pass = "";
                $scope.editUser.passChanged = 0;
            } else {
                $scope.editUser.passChanged = 1;
            }

            ApiService.editUser($scope.editUser)
                .then(function editUserSuccess(res) {

                    $log.debug("mainCtrl: editUser success: " + res);

                    $('#editUserModal').modal('toggle');
                    resetFormFields();
                    refreshAllUsers();
                    $route.reload();

                    alert("User edited successfully");

                }, function editUserError(reason) {
                    $log.error("mainCtrl: editUser failed. reason: ", reason);
                });
        };

        var editCurrentUser = function() {

            if (!$scope.editCurrentUser.pass || $scope.editCurrentUser.pass <= 0) {
                $scope.editCurrentUser.pass = "";
                $scope.editCurrentUser.passChanged = 0;
            } else {
                $scope.editCurrentUser.passChanged = 1;
            }

            ApiService.editUser($scope.editCurrentUser)
                .then(function editUserSuccess(res) {

                    $log.debug("mainCtrl: editCurrentUser success: " + res);

                    $('#editCurrentUserModal').modal('toggle');
                    resetFormFields();
                    refreshAllUsers();
                    $route.reload();

                    $scope.logoutRequest(true);

                }, function editUserError(reason) {
                    $log.error("mainCtrl: editCurrentUser failed. reason: ", reason);
                });
        };

        var changeUserStatus = function(userId, status) {

            var user = {};
            user.email = userId;
            user.status = (status == 1) ? 0 : 1;

            ApiService.changeUserStatus(user)
                .then(function changeUserStatusSuccess(res) {

                    $log.debug("mainCtrl: changeUserStatus success: " + res);
                    if (status == 1) {
                        alert("User deactivated successfully");
                    } else {
                        alert("User activated successfully");
                    }
                    refreshAllUsers();

                }, function changeUserStatusError(reason) {
                    $log.error("mainCtrl: changeUserStatus failed. reason: ", reason);
                });
        };






        var checkSession = function () {

            if (!$scope.user || $scope.user.length === 0) {
                $scope.user = ApiService.getCurrentUser();

                if ($scope.user) {

                    $log.debug("mainCtrl: initData: logged in from session success");
                    $scope.user.signed = true;

                    if ($scope.user.UserAuthLvl == 0) {
                        $scope.user.projects = $scope.projectList;
                        getAllUsers();

                    } else if ($scope.user.UserAuthLvl == 1) {
                        getUserProjects();
                        getUserInvestments();

                    } else if ($scope.user.UserAuthLvl == 2) {
                        getUserInvestments();
                    }
                }
            }
        };

        checkSession();

    }
);






kickstartControllers.controller('projectCtrl', function ($scope, $log, ApiService, $routeParams, $sce, $route) {

        $scope.project = {};
        $scope.project.ID = $routeParams.projectId;
        $scope.backersVisible = false;
        $scope.backFormVisible = false;


        var getProject = function() {
            ApiService.getProject($scope.project.ID)
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
        };

        getProject();

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

        $scope.showBackForm = function() {
            $scope.backFormVisible = ($scope.backFormVisible) ? false : true;
        };

        $scope.backProject = function() {

            if (!$scope.user) {
                alert("please login first");
                return;
            }

            var result = confirm("Are you sure you want to back this project with " + $scope.investAmount + "$ ?");

            if (!result) {
                return;
            }

            ApiService.backProject($scope.user.UserName, $scope.project.ID, $scope.investAmount)
                .then(function backProjectSuccess(res) {

                    $log.debug("mainCtrl: backProject success: " + res);
                    alert("You invested " + $scope.investAmount + "$ in this project successfully");
                    getProject();
                    $scope.backersVisible = false;
                    $scope.backFormVisible = false;
                    $route.reload();

                }, function backProjectError(reason) {
                    $log.error("mainCtrl: backProject failed. reason: ", reason);
                });
        };


        var getUser = function () {
            $scope.user = ApiService.getCurrentUser();
        };

        getUser();

    }
);