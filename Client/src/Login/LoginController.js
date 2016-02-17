"use strict";
angular.module("chatApp").controller("LoginController",
function LoginController($scope, $location, socket) {
    
    $scope.errorMessage = "";
    $scope.name = "";
    
    $scope.logIn = function logIn() {
        if($scope.name === "") {
            $scope.errorMessage = "You are going to have to choose a name, buddy!";
        }
        else {
            socket.emit("adduser", $scope.name, function(available) {
                if(available) {
                    $location.path($scope.name + "/rooms");
                }
                else {
                    $scope.errorMessage = "Sorry, buddy. \"" + $scope.name + 
                        " is taken... and there can only be one " + $scope.name;
                }
            });
        }
    }
});