"use strict";
angular.module("chatApp").controller("LoginController",
function LoginController($scope, $location, $routeParams, socket) {
    
    $scope.errorMessage = "";
    $scope.user = "";
    
    document.getElementById("logout").style.visibility = 'hidden';
    
    $scope.logIn = function logIn() {
        if($scope.user === "") {
            $scope.errorMessage = "You are going to have to choose a name, buddy!";
        }
        else {
            socket.emit("adduser", $scope.user, function(available) {
                if(available) {
                    $location.path($scope.user + "/rooms");
                }
                else {
                    $scope.errorMessage = "Sorry, buddy. \"" + $scope.user + 
                        " is taken... and there can only be one " + $scope.user;
                }
            });
        }
    };
});