"use strict";
angular.module('chatApp', ['ngRoute']);

angular.module('chatApp').config(["$routeProvider", function ($routProvider) {
    $routeProvider.when('/login', { 
            templateUrl: 'login/login.html', 
            controller: 'LoginController' 
        }).when('/signup', { 
            templateUrl: 'signup/signup.html', 
            controller: 'SignUpController' 
        }).otherwise({
            redirectTo: '/login'
        });
}]);

angular.module("chatApp").controller("HomeController", function($scope){
    $scope.message = "What's happening now?";
});