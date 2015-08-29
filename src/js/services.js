var kickstartServices = angular.module('kickstartServices', ['ngResource']);

kickstartServices.factory('User', ['$resource',
    function ($resource) {
        return $resource('main/:user.json', {}, {
            query: {method: 'GET', params: {user: 'email', user: 'password'}, isArray: true}
        });
    }]);


kickstartServices.factory('ApiService', function ($http, $log, $q) {

    function getTopProjects() {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: 'API/Request.php',
            data: "request=topProjects",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function (res) {
                $log.debug("ApiService: getTopProjects success: " + res);
                deferred.resolve(res);
            })
            .error(function (reason) {
                $log.error("ApiService: getTopProjects failed: ", reason);
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

    return {
        getTopProjects: getTopProjects,
        userLogin: userLogin,
        userRegister: userRegister

    };

});