"use strict";
angular.module('chatApp').controller('RoomsController', function($scope, socket, $routeParams, $location) {
    
    $scope.user = $routeParams.user;
    $scope.rooms;
    $scope.errorMessage = "";
    $scope.roomName = "";
    $scope.msgs = [];
    var sendTo = document.getElementById("sendto").selected;
    document.getElementById("logout").style.visibility = 'visible';
    
    socket.emit('rooms');
	socket.on('roomlist', function(roomsList){
		$scope.rooms = roomsList;
	});
    
    $scope.makeRoom = function makeRoom() {
        if($scope.roomName === "") {
            $scope.errorMessage = "Don't be a jerk, give it a name!";
        }
        else {
            $location.path($scope.user + "/" + $scope.roomName);
        }
    };
    
    $scope.logOut = function logOut() {
        socket.emit('disconnect');
        $location.path('/login');
    }
    
    socket.emit('users');
	socket.on('userlist', function(usersList){
		$scope.users = usersList;
	});
        
    socket.on('recv_privatemsg', function (sender, msg) {
        $scope.msgs.push({
            sender: sender,
            msg: msg
        });
        console.log("Message! " + $scope.msgs.sender + " " + $scope.msgs.msg);
        sendTo = sender;
        console.log($scope.msgs);
    });
    
    $scope.send = function send() {
        socket.emit('privatemsg', {nick: sendTo, message: $scope.newMsg});
    }
    
    $scope.chooseUser = function chooseUser(user) {
        sendTo = user;
    }
});