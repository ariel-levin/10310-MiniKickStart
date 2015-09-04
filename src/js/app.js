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
            when('/myProjects/:userId', {
                templateUrl: 'partials/myProjects.html',
                controller: 'mainCtrl'
            }).
            when('/allProjects', {
                templateUrl: 'partials/allProjects.html',
                controller: 'mainCtrl'
            }).
            when('/allUsers', {
                templateUrl: 'partials/allUsers.html',
                controller: 'mainCtrl'
            }).
            when('/myInvestments/:userId', {
                templateUrl: 'partials/myInvestments.html',
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