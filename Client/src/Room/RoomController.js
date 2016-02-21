"use strict";
angular.module('chatApp').controller('RoomController', function($scope, socket, $routeParams, $location) {
    
    /*$('#popover').popover({
        title: "<h1><strong>HTML</strong> inside <code>the</code> <em>popover</em></h1>", 
        content: "Blabla <br> <h2>Cool stuff!</h2>", 
        html: true, 
        placement: "right"
    });*/
    $scope.currUser = $routeParams.user;
    $scope.roomName = $routeParams.roomName;
    var joinObj = {
        room: $scope.roomName,
        pass: undefined
    };
    
    socket.emit('joinroom', joinObj, function (success, reason) {
        if(!success) {
            alert(reason);
            $location.path('/' + $scope.currUser + '/rooms');
        }
    });
    socket.on('updateusers', function(room, users, ops) {
        if($scope.roomName === room) {
            $scope.users = users;
            $scope.ops = ops;
            if(ops[$scope.currUser] !== undefined) {
                document.getElementById('kick').style.visibility = "visible";
                document.getElementById('ban').style.visibility = "visible";
                socket.emit('users');
                socket.on('userlist', function (allUsers) {
                    $scope.allUsers = allUsers;
                })
            }
        }
    });
    
    socket.on('updatechat', function(room, msgHistory) {
        if($scope.roomName === room) {
            $scope.msgs = msgHistory;
        }
    })
    
    $scope.send = function send() {
        socket.emit('sendmsg', {
            roomName: $scope.roomName,
            msg: $scope.newMsg
        });
        document.getElementById('msginput').value = '';
    };
        
    $scope.go = function go() {
        socket.emit('partroom', $scope.roomName);
        $location.path($scope.currUser + '/rooms');
    };
    
    $scope.kick = function kick() {
        if($scope.ops[$scope.currUser] !== undefined) {
            var banUser = document.getElementById('userkick').value;
            socket.emit('kick', {
                user: banUser,
                room: $scope.roomName
            });
            console.log('kick sent');
        }
        else {
            console.log('kick not sent');
        }
    };
    
    socket.on('kicked', function (room, user, baner) {
        if($scope.currUser === user && $scope.roomName === room) {
            console.log($scope.roomName + " " + room);
            // TODO: Í hvert skifti sem hann er kick-aður, þá fær hann
            //      alert 1+ oftar.
            
            $location.path('/' + $scope.currUser + '/rooms');
            //alert("I'm not your friend, buddy!\nYou were just kicked out of " + room + " by " + baner);
        }
    });
    
    $scope.ban = function ban() {
        if($scope.ops[$scope.currUser] !== undefined) {
            var banUser = document.getElementById('userban').value;
            socket.emit('ban', {
                user: banUser,
                room: $scope.roomName
            });
            console.log('ban sent');
        }
        else {
            console.log('ban not sent');
        }
    }
    
    socket.on('banned', function (room, user, baner) {
        if($scope.currUser === user && $scope.roomName === room) {
            console.log($scope.roomName + " " + room);
            // TODO: Í hvert skifti sem hann er kick-aður, þá fær hann
            //      alert 1+ oftar.
            
            $location.path('/' + $scope.currUser + '/rooms');
            //alert("I'm not your buddy, guy!\nYou were just banned from " + room + " by " + baner);
        }
    });
    
    $scope.unban = function unban() {
        if($scope.ops[$scope.currUser] !== undefined) {
            var banUser = document.getElementById('userban').value;
            socket.emit('unban', {
                user: banUser,
                room: $scope.roomName
            });
            console.log('ban sent');
        }
        else {
            console.log('ban not sent');
        }
    }
});