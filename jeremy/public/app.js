/*var io = require('socket.io');
var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = io.listen(server);

server.listen(3000);
console.log("listening on 3000");

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
//
*/

//https://github.com/learnboost/socket.io/

var express = require('express');
var app = express();
var socket = require('socket.io');
app.configure(function(){
    app.use(express.static(__dirname + '/'));
});
var server = app.listen(8080);
var io = socket.listen(server);

io.sockets.on('connection', function (socket) {
    console.log("connnect");
    socket.on('disconnect', function (socket) {
        console.log("disconnect");
    });

    socket.emit("status_update",{txt:"Connected to server"});
    socket.on('user_action', function (data) {
        console.log("User clicked: " + data.txt);

        socket.broadcast.emit("status_update",{txt: data.username + " clicked " + data.txt});
    });
});
