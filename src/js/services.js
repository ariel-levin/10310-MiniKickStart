var kickstartServices = angular.module('kickstartServices', ['ngResource']);

kickstartServices.factory('User', ['$resource',
    function ($resource) {
        return $resource('main/:user.json', {}, {
            query: {method: 'GET', params: {user: 'email', user: 'password'}, isArray: true}
        });
    }]);