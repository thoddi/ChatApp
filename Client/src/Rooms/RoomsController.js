"use strict";
angular.module('chatApp').controller('RoomsController', function($scope, socket, $routeParams, $location) {
    
    $scope.user = $routeParams.user;
    $scope.rooms;
    $scope.errorMessage = "";
    $scope.roomName = "";
    $scope.msgs = [];
    $scope.senders = [];
    
    //var sendTo = document.getElementById("sendto").selected;
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
        /*for(var i = 0; i < usersList.length; i++) {
            $scope.senders[usersList[i]] = {
                nick: usersList[i],
                msgs: []
            }
        }*/
        //console.log($scope.senders);
	});
        
    socket.on('recv_privatemsg', function (sender, message) {
        $scope.msgs.push({
            sender: sender,
            msg: message
        });
        console.log("1: " + message);
        
        if(containsUser(sender)) {
            $scope.senders[indexOfSender(sender)].msgs.push({
            nick: sender,
            msg: message
        });
        }
        else {
            $scope.senders.push({
                nick: sender,
                msgs: [{
                    nick: sender,
                    msg: message
                }]
            });
            console.log("2: " + message);
        }
        console.log($scope.senders);
        //console.log("Message! " + $scope.msgs.sender + " " + $scope.msgs.msg);
        //sendTo = sender;
    });
    
    $scope.send = function send(sendName) {
        var message = document.getElementById(sendName).value;
        console.log(message);
        document.getElementById(sendName).value = "";
        socket.emit('privatemsg', {nick: sendName, message: message});
        $scope.msgs.push({sender: $scope.user, msg: message});
        $scope.senders[indexOfSender(sendName)].msgs.push({
            nick: $scope.user,
            msg: message
        });
    };
    
    /*$scope.chooseUser = function chooseUser(user) {
        sendTo = user;
    };*/
    
    $scope.addSender = function addSender(sender) {
        console.log("click damn it!! " + sender);
        if(!containsUser(sender) && $scope.user !== sender) {
            //console.log($scope.senders.indexOf(sender));
            $scope.senders.push({
                //id: $scope.senders.length,
                nick: sender,
                msgs: new Array()
            });
        }
        console.log($scope.senders);
    };
    
    function containsUser(str) {
        for(var i = 0; i < $scope.senders.length; i++) {
            if($scope.senders[i].nick === str) {
                return true;
            }
        }
        return false;
    }
    
    function indexOfSender(str) {
        for(var i = 0; i < $scope.senders.length; i++) {
            if($scope.senders[i].nick === str) {
                return i;
            }
        }
        return -1;
    }
});