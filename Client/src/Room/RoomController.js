"use strict";
angular.module('chatApp').controller('RoomController', function($scope, socket, $routeParams, $location) {
    
    $scope.currUser = $routeParams.user;
    $scope.roomName = $routeParams.roomName;
    var joinObj = {
        room: $scope.roomName,
        pass: undefined
    };
    
    // TODO: Sjá til þess að þegar einhver býr til herbergi
    //          þá er notandinn á listanum.
        
    socket.emit('joinroom', joinObj);
    socket.on('updateusers', function(room, users, ops) {
        if($scope.roomName === room) {
            $scope.users = users;
            $scope.ops = ops;
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
    };
        
    $scope.go = function go() {
        socket.emit('partroom', $scope.roomName);
        $location.path($scope.currUser + '/rooms');
    };
});