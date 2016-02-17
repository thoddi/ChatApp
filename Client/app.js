"use strict";

angular.module('chatapp', ['ngRoute'])
.config($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'login/login.html', controller: 'LoginController' })
        .when('/signup', { templateUrl: 'signup/signup.html', controller: 'SignUpController' })
        /*.when('/:user/', { templateUrl: 'rooms/rooms.html', controller: 'RoomsController' })
        .when('/room/:user/:room/', { templateUrl: 'Views/room.html', controller: 'RoomController' })*/
        .otherwise({
            redirectTo: '/'
        });
}