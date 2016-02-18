"use strict";

angular.module('chatApp', ['ui.bootstrap', 'ng', 'ngRoute']).config(["$routeProvider", 
function ($routeProvider) {
    $routeProvider.when('/login', { 
            templateUrl: 'src/Login/login.html', 
            controller: 'LoginController' 
        }).when('/:user/rooms', {
            templateUrl: 'src/Rooms/rooms.html',
            controller: 'RoomsController'
        }).when('/:user/:roomName', {
            templateUrl: 'src/Room/room.html',
            controller: 'RoomController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);