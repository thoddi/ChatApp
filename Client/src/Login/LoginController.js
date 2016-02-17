"use strict";
angular.module("chatApp").controller("LoginController",
function LoginController($scope, $location) {
    $scope.message = "Hello from login";
    
    $scope.clickMe = function(){
        $location.path('/signup');
    }
});