//https://github.com/learnboost/socket.io/

var express = require('express');
var app = express();
var socket = require('socket.io');
app.configure(function(){
    //app.use(express.static(__dirname + '/'));
    app.use(express.static(__dirname + "/"));
});

var server = app.listen(8080);
var io = socket.listen(server);

io.sockets.on('connection', function (socket) {
    console.log("connnect");
    //console.log("test123");
    console.log("HEYO: " + __dirname);
    socket.on('disconnect', function (socket) {
        console.log("disconnect");
    });

    socket.emit("status_update",{txt:"Connected to server"});
    socket.on('user_action', function (data) {
        console.log("User clicked: " + data.txt);

        socket.broadcast.emit("status_update",{txt: data.username + " clicked " + data.txt});
    });
});
