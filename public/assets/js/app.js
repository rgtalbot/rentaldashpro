var app = angular.module('rentalDashPro', ['ui.router', "ngStorage"]);

app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: "MainController"
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        });

    $locationProvider.html5Mode(true);

}]);



