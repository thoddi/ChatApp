"use strict";

angular.module('chatApp', ['ui.bootstrap', 'ng', 'ngRoute']).config(["$routeProvider", 
function ($routeProvider) {
    $routeProvider.when('/login', { 
            templateUrl: 'src/Login/login.html', 
            controller: 'LoginController' 
        }).when('/signup', { 
            templateUrl: 'src/signup/signup.html', 
            controller: 'SignUpController' 
        }).otherwise({
            redirectTo: '/login'
        });
}]);