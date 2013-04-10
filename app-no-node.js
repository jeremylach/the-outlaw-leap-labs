//https://github.com/learnboost/socket.io/

var countdown = -1;
var game_in_progress = false;

var names = ["Gassy Bill", "Jon The Kid", "Asian Will", "White Will", "Craigy", "Goofy Frank", "Curly Larry"];




    $(document).on("start_game", function(event, data) {

        if(!game_in_progress) {
            game_in_progress = true;
            countdown = data;
            var timer_interval = setInterval(function() {
                if(countdown < 0) {
                    clearInterval(timer_interval);
                }
                countdown--;
                $(document).trigger("timer", countdown);
                //io.sockets.emit('timer', { countdown: countdown });

            }, 1000);
        }
    });

    $(document).on("get_name", function(event) {
        var random_idx = Math.floor(Math.random() * names.length);
        player_name = names[random_idx];
        //io.socket.message("name_assign", {name: player_name});

        names.splice(random_idx, 1);
        //socket.send(names); ????

        //io.sockets.sockets[socket.id].emit("assign_name", {name: player_name});//, {name: player_name});
        $(document).trigger("assign_name", player_name);
    });

    $(document).on("end_game", function(data) {
        game_in_progress = false;
        names = ["Gassy Bill", "Jon The Kid", "Asian Will", "White Will", "Craigy"];
    });

    /*$(document).on('disconnect', function (socket) {
        console.log("disconnect");
    });*/

    //socket.emit("status_update",{txt:"Connected to server"});

    $(document).on('reset', function (event, data) {
        countdown = data;
        $(document).trigger('timer', countdown);
    });


    /*socket.on('user_action', function (data) {
        console.log("User clicked: " + data.txt);

        socket.broadcast.emit("status_update",{txt: data.username + " clicked " + data.txt});
    });*/

    $(document).on('user_fired', function (event, data) {
        //console.log("user did a fire");
        winner = data;
        $(document).trigger("gameover", data);

        //socket.emit("outcome",{txt: data.username + " won"});
    });
    //socket.emit("user_fired",{username: "test" , action: "fired" });



