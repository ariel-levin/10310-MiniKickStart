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
    }]);