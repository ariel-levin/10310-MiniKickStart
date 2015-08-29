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
                .error(function(reason){
                    $log.error("ApiService: getTopProjects failed: ", reason);
                    deferred.reject(reason);
                });

            return deferred.promise;
        }

        return {
            getTopProjects: getTopProjects

        };
    });