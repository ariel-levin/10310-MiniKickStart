var kickstartServices = angular.module('kickstartServices', ['ngResource']);

kickstartServices.factory('User', function () {


});


kickstartServices.factory('ApiService', function ($http, $log, $q) {

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
                $log.debug("ApiService: createNewProject(1) success: " + res);
                deferred.resolve(res);

                // TODO: add file upload after the first insert succeed
            })
            .error(function (reason) {
                $log.error("ApiService: createNewProject(1) failed: ", reason);
                deferred.reject(reason);
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
        createNewProject: createNewProject

    };

});