var kickstartServices = angular.module('kickstartServices', ['ngResource']);

kickstartServices.factory('User', function () {


});


kickstartServices.factory('ApiService', function ($http, $log, $q, Upload) {

    function getProjectList() {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=projectList",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: getProjectList success: " + res);
                deferred.resolve(res);
            })
            .error(function (reason) {
                $log.error("ApiService: getProjectList failed: ", reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    function getUserProjects(userName) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=userProjects&userName=" + userName,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: getUserProjects success: " + res);
                deferred.resolve(res);
            })
            .error(function (reason) {
                $log.error("ApiService: getUserProjects failed: ", reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    function getUserInvestments(userName) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=userBackings&userName=" + userName,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: getUserInvestments success: " + res);
                deferred.resolve(res);
            })
            .error(function (reason) {
                $log.error("ApiService: getUserInvestments failed: ", reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    function userLogin(login) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=login&userName=" + login.email + "&pass=" + login.pass,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: userLogin success: " + res);
                deferred.resolve(res);
            })
            .error(function (reason) {
                $log.error("ApiService: userLogin failed: ", reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    function userRegister(register) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=registerUser&userName=" + register.email + "&pass=" + register.pass +
                "&authLvl=" + register.auth + "&fname=" + register.firstName + "&lname=" +
                register.lastName + "&gen=" + register.gender,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: userRegister success: " + res);
                deferred.resolve(res);
            })
            .error(function (reason) {
                $log.error("ApiService: userRegister failed: ", reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    function getProject(pid) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=getProject&pid=" + pid,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: getProject success: " + res);
                deferred.resolve(res);
            })
            .error(function (reason) {
                $log.error("ApiService: getProject failed: ", reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    }


    function createNewProject(project) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=addProject&name=" + project.name + "&description=" + project.desc +
            "&amount=" + project.fund + "&videoUrl=" + project.video + "&endDate=" + project.endDate +
            "&owner=" + project.owner,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: createNewProject success: " + res);
                deferred.resolve(res);

            })
            .error(function (reason) {
                $log.error("ApiService: createNewProject failed: ", reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    function editProject(project) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=updateProjectInfo&pid=" + project.id + "&name=" + project.name + "&description=" +
            project.desc + "&videoUrl=" + project.video,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: editProject success: " + res);
                deferred.resolve(res);

            })
            .error(function (reason) {
                $log.error("ApiService: editProject failed: ", reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    function deleteProject(pid) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=deleteProject&pid=" + pid,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: deleteProject success: " + res);
                deferred.resolve(res);

            })
            .error(function (reason) {
                $log.error("ApiService: deleteProject failed: ", reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    function uploadProjectMainPic(file, pid) {
        var deferred = $q.defer();

        file.upload = Upload.upload({
            url: 'API/Request.php',
            method: 'POST',
            fields: { request:'uploadMainPic', pid: pid },
            file: file,
            fileFormDataName: 'mainPic'
        });

        file.upload.then(function (res) {

            $log.debug("ApiService: uploadProjectMainPic success: " + res);
            deferred.resolve(res);

        }, function (response) {

            $log.error("ApiService: uploadProjectMainPic failed: ", response);
            deferred.reject(response);

        });

        return deferred.promise;
    }

    function uploadProjectPics(files, pid) {
        var deferred = $q.defer();

        files.upload = Upload.upload({
            url: 'API/Request.php',
            method: 'POST',
            fields: { request:'uploadPics', pid: pid },
            file: files,
            fileFormDataName: 'files[]'
        });

        files.upload.then(function (res) {

            $log.debug("ApiService: uploadProjectPics success: " + res);
            deferred.resolve(res);

        }, function (response) {

            $log.error("ApiService: uploadProjectPics failed: ", response);
            deferred.reject(response);

        });

        return deferred.promise;
    }



    return {
        getProjectList: getProjectList,
        userLogin: userLogin,
        userRegister: userRegister,
        getProject: getProject,
        getUserProjects: getUserProjects,
        getUserInvestments: getUserInvestments,
        createNewProject: createNewProject,
        uploadProjectMainPic: uploadProjectMainPic,
        uploadProjectPics: uploadProjectPics,
        editProject: editProject,
        deleteProject: deleteProject

    };

});