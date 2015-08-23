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
    }
]);

kickstartApp.controller('AppCtrl', ['$scope', 'User',
    function ($scope, User) {

        $scope.main = {};
        $scope.main.signedIn = false;

        $scope.login = {};
        $scope.register = {};

        $scope.login = function (valid) {
            if (valid) {
                $scope.main.signedIn = true;

                alert("login success\n"
                    + "\nemail: " + $scope.login.email
                    + "\npass: " + $scope.login.pass);

                $('#loginModal').modal('toggle');
            } else {
                alert("some login form fields are incorrect");
            }
        };

        $scope.logout = function () {
            $scope.main.signedIn = false;
            alert("logged out success");
        };

        $scope.register = function (valid) {
            if (valid) {
                alert("register success\n"
                    + "\nname: " + $scope.register.firstName + " " + $scope.register.lastName
                    + "\nemail: " + $scope.register.email
                    + "\npass: " + $scope.register.pass);

                $('#registerModal').modal('toggle');
            } else {
                alert("some register form fields are incorrect");
            }
        };


        $scope.templateProjects = [
            {
                "name": "Project 1",
                "thumb": "project1.png",
                "desc": "Rooms oh fully taken by worse do. Points afraid but may end law lasted. Was out laughter raptures returned outweigh. Luckily cheered colonel me do we attacks on highest enabled. Tried law yet style child.",
                "link": "#main"
            },
            {
                "name": "Project 2",
                "thumb": "project2.jpg",
                "desc": "Delighted consisted newspaper of unfeeling as neglected so. Tell size come hard mrs and four fond are. Of in commanded earnestly resources it. At quitting in strictly up wandered of relation answered felicity.",
                "link": "#main"
            },
            {
                "name": "Project 3",
                "thumb": "project3.png",
                "desc": "Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his. So neither related he am do believe. Nothing but you hundred had use regular.",
                "link": "#main"
            },
            {
                "name": "Project 4",
                "thumb": "project4.png",
                "desc": "Scarcely on striking packages by so property in delicate. Up or well must less rent read walk so be. Easy sold at do hour sing spot. Any meant has cease too the decay. Since party burst am it match.",
                "link": "#main"
            },
            {
                "name": "Project 5",
                "thumb": "project5.png",
                "desc": "Stronger unpacked felicity to of mistaken. Fanny at wrong table ye in. Be on easily cannot innate in lasted months on. Differed and and felicity steepest mrs age outweigh. Opinions learning likewise daughter now age outweigh.",
                "link": "#main"
            },
            {
                "name": "Project 6",
                "thumb": "project6.jpg",
                "desc": "Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing.",
                "link": "#main"
            }
        ];

    }
]);