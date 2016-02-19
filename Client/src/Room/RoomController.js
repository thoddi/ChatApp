"use strict";
angular.module('chatApp').controller('RoomController', function($scope, socket, $routeParams, $location) {
    
    $('.user-pop').popover({
        title: "<h1><strong>HTML</strong> inside <code>the</code> <em>popover</em></h1>", 
        content: "Blabla <br> <h2>Cool stuff!</h2>", 
        html: true, 
        placement: "right"
    }); 
    $('#popover').popover({
        title: "<h1><strong>HTML</strong> inside <code>the</code> <em>popover</em></h1>", 
        content: "Blabla <br> <h2>Cool stuff!</h2>", 
        html: true, 
        placement: "right"
    });
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
        document.getElementById('msginput').value = '';
    };
        
    $scope.go = function go() {
        socket.emit('partroom', $scope.roomName);
        $location.path($scope.currUser + '/rooms');
    };
    
    
});

angular.module('chatApp').directive('popover', function() {
    return function(scope, elem) {
        elem.popover();
    }
});