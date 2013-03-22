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

var countdown = -1;
var game_in_progress = false;

var names = ["Gassy Bill", "Jon The Kid", "Asian Will", "White Will", "Craigy", "Goofy Frank", "Curly Larry"];

io.sockets.on('connection', function (socket) {
    console.log("connnect");


    socket.on("start_game", function(data) {

        if(!game_in_progress) {
            game_in_progress = true;
            countdown = data.gametime;
            var timer_interval = setInterval(function() {
                if(countdown < 0) {
                    clearInterval(timer_interval);
                }
                countdown--;
                io.sockets.emit('timer', { countdown: countdown });

            }, 1000);
        }
    });

    socket.on("get_name", function() {
        var random_idx = Math.floor(Math.random() * names.length);
        player_name = names[random_idx];
        //io.socket.message("name_assign", {name: player_name});

        names.splice(random_idx, 1);
        socket.send(names);

        io.sockets.sockets[socket.id].emit("assign_name", {name: player_name});//, {name: player_name});
    });

    socket.on("end_game", function(data) {
        game_in_progress = false;
        names = ["Gassy Bill", "Jon The Kid", "Asian Will", "White Will", "Craigy"];
    });

    socket.on('disconnect', function (socket) {
        console.log("disconnect");
    });

    socket.emit("status_update",{txt:"Connected to server"});

    socket.on('reset', function (data) {
        countdown = data.gametime;
        io.sockets.emit('timer', { countdown: countdown });
    });


    /*socket.on('user_action', function (data) {
        console.log("User clicked: " + data.txt);

        socket.broadcast.emit("status_update",{txt: data.username + " clicked " + data.txt});
    });*/

    socket.on('user_fired', function (data) {
        //console.log("user did a fire");
        winner = data.username;
        io.sockets.emit("gameover", {winner: data.username});

        //socket.emit("outcome",{txt: data.username + " won"});
    });
    //socket.emit("user_fired",{username: "test" , action: "fired" });
});


