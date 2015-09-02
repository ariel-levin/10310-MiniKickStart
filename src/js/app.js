var kickstartApp = angular.module('kickstartApp', [
    'ngRoute',
    'kickstartControllers',
    'kickstartServices',
    'ngFileUpload'
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
            when('/projectList/:userId', {
                templateUrl: 'partials/projectList.html',
                controller: 'mainCtrl'
            }).
            when('/investList/:userId', {
                templateUrl: 'partials/investList.html',
                controller: 'mainCtrl'
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