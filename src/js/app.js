var kickstartApp = angular.module('kickstartApp', [
    'ngRoute',
    'kickstartControllers',
    'kickstartServices'
]);

kickstartApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider.
            when('/main', {
                templateUrl: 'partials/main.html',
                controller: 'mainCtrl'
            }).
            when('/project/:projectId', {
                templateUrl: 'partials/project.html',
                controller: 'projectCtrl'
            }).
            otherwise({
                redirectTo: '/main'
            });

        $httpProvider.defaults.withCredentials = true;
    }
]);

kickstartApp.controller('appCtrl', function () {


    }
);