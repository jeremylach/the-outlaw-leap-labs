var VIEWPORT_WIDTH = 900;
var VIEWPORT_HEIGHT = 675;

// The game object.
function Game(enemyAI) {

    //------ Member Variables ------//

    // --viewport variables
    this.canvas = document.getElementById('viewport');
    this.context = this.canvas.getContext('2d');

    // --game loop variables
    this.fps = 30;
    this.gameInterval = null;

    // --game state variables
    this.states = [
        {name: 'title'},
        {name:'opening1', length: 600, frame: 0},
        //{name:'standoff'},
        {name:'shootout'},
        {name:'defeat'}, {name:'victory'}
    ];
    this.state = 0; // Title

    // --images
    this.img_bg = new Image();
    this.img_bg.src = '../assets/bg-sky.png';
    this.img_bg_sun = new Image();
    this.img_bg_sun.src = '../assets/bg-sun.png';
    this.img_bg_ground = new Image();
    this.img_bg_ground.src = '../assets/bg-ground.png';

    this.img_cowboy_opening1 = new Image();
    this.img_cowboy_opening1.src = '../assets/cowboy-opening1.png';
    this.img_cowboy_shadow_opening1 = new Image();
    this.img_cowboy_shadow_opening1.src = '../assets/cowboy-shadow-opening1.png';
    this.img_cowboy_dead = new Image();
    this.img_cowboy_dead.src = '../assets/cowboy-dead.png';
    this.img_cowboy_dead_shadow = new Image();
    this.img_cowboy_dead_shadow.src = '../assets/cowboy-dead-shadow.png';

    this.img_cowboy = new Image();
    this.img_cowboy.src = '../assets/cowboy.png';

    this.img_title = new Image();
    this.img_title.src = '../assets/title.png';

    // --background music
    this.bgMusic = new Audio('../assets/sound/music/western_music.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.play();

    // --sound effects
    this.sfx_gunfire = new Audio('../assets/sound/sfx/gun_fire.wav');
    this.sfx_draw = new Audio('../assets/sound/sfx/draw.mp3');

    // --shootout variables
    this.initialShootCountdown = Math.ceil(Math.random() * 8) + 3;
    this.shootCountdown = null;
    this.drawReady = false;
    this.readyToShoot = false;

    this.playerShootInput = false;
    this.playerShot = false;

    this.enemyAI = enemyAI;
    this.enemyShootCountdown = 200; // For AI
    this.enemyShootInput = false;
    this.enemyShot = false;

    //------ Helper Functions ------//

    // Change the state to the state with the given name.
    this.setStateByName = function(stateName) {
        for(var i = 0; i < this.states.length; i++) {
            if(this.states[i].name == stateName){ this.state = i; break; }
        }
    }

    // Trigger when the player shoots.
    this.playerShoot = function() {

        // The player is allowed to shoot and fires.
        if(this.readyToShoot){
            this.playerShootInput = true;
            var name = "Jeremy";
            //Register shot on server
            //socket.emit("user_fired",{username: "test"});
            $(document).trigger("user_fired", name);


        // The player is not allowed to shoot.
        } else {
            //TODO: player fired before ready
        }
    }

    // Trigger when the enemy shoots.
    this.enemyShoot = function() {

        // The enemy is allowed to shoot and fires.
        if(this.readyToShoot){
            this.enemyShootInput = true;
        // The enemy is not allowed to shoot.
        } else {
            //TODO: enemy fired before ready
        }
    }

    //------- Main Functions -------//

    // Update the game for one tick of the world time.
    this.update = function() {

        // The first part of the opening is occurring.
        if(this.states[this.state].name == 'opening1') {

            // If the frames have been completed, change the state.
            if(this.states[this.state].frame >= this.states[this.state].length) {
                this.state++;
            // Otherwise, step to the next frame.
            } else {
                this.states[this.state].frame++;
            }
        }

        // The standoff update handlers.
        if(this.states[this.state].name == 'standoff') {

        }


        // The shootout update handlers.
        if(this.states[this.state].name == 'shootout') {

            if(this.shootCountdown == null) {
                $(document).trigger("start_game", this.initialShootCountdown);
            }

            $('#shootoutcountdown').html(this.shootCountdown);
            $('#playershot').html(this.playerShot);
            $('#enemyshootcountdown').html(this.enemyShootCountdown);
            $('#enemyshot').html(this.enemyShot);

            // If the shoot countdown is over, stop the
            // music and allow the player to shoot.
            if(this.shootCountdown == 0 && this.drawReady == false) {
                this.bgMusic.pause();
                this.drawReady = true;
                this.sfx_draw.play();
                this.readyToShoot = true;

                //this.shootCountdown--;
                $('#message').text('Shoot!');
            // Otherwise, continue counting down.
            } else if(this.shootCountdown > 0) {
               // this.shootCountdown--;
                $('#message').text('Ready, set...');
            }

            // If the enemy is under AI control.
            if(this.enemyAI && this.readyToShoot) {

                // If the enemy is ready to shoot, make them shoot.
                if(this.enemyShootCountdown == 0) {
                    this.enemyShoot();
                    this.enemyShootCountdown--;
                // Otherwise, continue counting down.
                } else if(this.enemyShootCountdown > 0) {
                    this.enemyShootCountdown--;
                }
            }

            // If the player has shot first, kill the enemy.
            if(this.playerShootInput && this.playerShot == false && this.enemyShot == false) {
                this.playerShot = true;
                this.sfx_gunfire.play();
                this.setStateByName('victory');
                // TODO: kill the enemy
            }

            // If the enemy has shot first, kill the player.
            if(this.enemyShootInput && this.playerShot == false && this.enemyShot == false) {
                // do something
                this.enemyShot = true;
                this.sfx_gunfire.play();
                this.setStateByName('defeat');
                // TODO: kill the player
            }
        }

        // The player loses.
        if(this.states[this.state].name == 'defeat') {
            this.stop();

            $('#message').text('You lost');
        }

        // The player is victorious.
        if(this.states[this.state].name == 'victory') {
            this.stop();

            $('#message').text('You win!');
        }
    }

    // Render the current state of the game to the viewport.
    this.draw = function() {

        // Draw the sky background.
        this.context.drawImage(this.img_bg, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

        if(this.states[this.state].name == 'title') {
            this.context.drawImage(this.img_title, 0,0);
            // TODO: do this once, instead of on every draw.
            $('#menu').show();
            $('#instructions').show();
            $('#start').show();
        }

        // The first part of the opening is occurring.
        if(this.states[this.state].name == 'opening1') {

            length = this.states[this.state].length;
            frame = this.states[this.state].frame;

            // Draw the background.
            this.context.drawImage(this.img_bg_sun, (VIEWPORT_WIDTH / 2) - (this.img_bg_sun.width / 2), -(this.img_bg_sun.height / 4) + (180 * (1 - (frame / length))));
            this.context.drawImage(this.img_bg_ground, (VIEWPORT_WIDTH / 2) - (this.img_bg_ground.width / 2), VIEWPORT_HEIGHT / 2 - 80);
            // Draw the cowboy.
            this.context.drawImage(this.img_cowboy_opening1, (VIEWPORT_WIDTH / 2) - (this.img_cowboy_opening1.width / 2), (VIEWPORT_HEIGHT / 2) - this.img_cowboy_opening1.height);
            this.context.drawImage(this.img_cowboy_shadow_opening1, (VIEWPORT_WIDTH / 2) - (this.img_cowboy_shadow_opening1.width / 2) + 6, (VIEWPORT_HEIGHT / 2) - 2,
                this.img_cowboy_shadow_opening1.width, this.img_cowboy_shadow_opening1.height * (1 - (.5 * (frame / length))));

            $('#menu').hide();
            $('#instructions').hide();
            $('#start').hide();
        }

        // The standoff update handlers.
        if(this.states[this.state].name == 'standoff') {

        }

        // The shootout is active.
        if(this.states[this.state].name == 'shootout') {

            // Draw the background.
            this.context.drawImage(this.img_bg_sun, (VIEWPORT_WIDTH / 2) - (this.img_bg_sun.width / 2), -(this.img_bg_sun.height / 4));
            this.context.drawImage(this.img_bg_ground, (VIEWPORT_WIDTH / 2) - (this.img_bg_ground.width / 2), VIEWPORT_HEIGHT / 2);
            // Draw the cowboy.
            this.context.drawImage(this.img_cowboy, (VIEWPORT_WIDTH / 2) - (this.img_cowboy.width / 2), (VIEWPORT_HEIGHT / 2) + 20);
            this.context.drawImage(this.img_cowboy_shadow_opening1, (VIEWPORT_WIDTH / 2) - (this.img_cowboy_shadow_opening1.width / 2) + 6, (VIEWPORT_HEIGHT / 2) + 80,
                this.img_cowboy_shadow_opening1.width, this.img_cowboy_shadow_opening1.height * .38);
        }

        // The player has been defeated.
        if(this.states[this.state].name == 'defeat') {
            this.context.drawImage(this.img_bg_sun, (VIEWPORT_WIDTH / 2) - (this.img_bg_sun.width / 2), -(this.img_bg_sun.height / 4));
            this.context.drawImage(this.img_bg_ground, (VIEWPORT_WIDTH / 2) - (this.img_bg_ground.width / 2), VIEWPORT_HEIGHT / 2);
            // Draw the cowboy.
            this.context.drawImage(this.img_cowboy, (VIEWPORT_WIDTH / 2) - (this.img_cowboy.width / 2), (VIEWPORT_HEIGHT / 2) + 20);
            this.context.drawImage(this.img_cowboy_dead_shadow, (VIEWPORT_WIDTH / 2) - (this.img_cowboy_dead_shadow.width / 2) + 6, (VIEWPORT_HEIGHT / 2) + 80,
                this.img_cowboy_dead_shadow.width, this.img_cowboy_dead_shadow.height * .38);
        }

        // The player is victorious.
        if(this.states[this.state].name == 'victory') {
            // Draw the background.
            this.context.drawImage(this.img_bg_sun, (VIEWPORT_WIDTH / 2) - (this.img_bg_sun.width / 2), -(this.img_bg_sun.height / 4));
            this.context.drawImage(this.img_bg_ground, (VIEWPORT_WIDTH / 2) - (this.img_bg_ground.width / 2), VIEWPORT_HEIGHT / 2);
            // Draw the cowboy.
            this.context.drawImage(this.img_cowboy_dead, (VIEWPORT_WIDTH / 2) - (this.img_cowboy.width / 2) - 8, (VIEWPORT_HEIGHT / 2) + 43);
            this.context.drawImage(this.img_cowboy_dead_shadow, (VIEWPORT_WIDTH / 2) - (this.img_cowboy_dead_shadow.width / 2) - 8, (VIEWPORT_HEIGHT / 2) + 68,
                this.img_cowboy_dead_shadow.width, this.img_cowboy_dead_shadow.height * .38);
        }
    }

    // The main game loop; updates and draws.
    this.gameLoop = function() {

        this.update();
        this.draw();
    }

    // Run the game.
    this.run = function() {

        gameRef = this;
        this.gameInterval = setInterval(function() { gameRef.gameLoop(); }, 1000 / Game.fps);
        $(document).trigger("get_name");
        //socket.emit("start_game", {gametime: this.initialShootCountdown});
        //if(your_name == "noname") {
          //  socket.emit("get_name");
        //}

    }

    // Stop the game.
    this.stop = function() {

        if(this.gameInterval != null) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }

        $(document).trigger("end_game");
    }
}

// Define the game as a global variable.
var game = new Game(true);
var countdown = -1;

//var socket;
var your_name = "noname";
var names = ["Gassy Bill", "Jon The Kid", "Asian Will", "White Will", "Craigy", "Goofy Frank", "Curly Larry"];

// When the document is ready
$(document).ready(function() {
    //var random_idx = Math.floor(Math.random() * names.length);
    //your_name = names[random_idx];
    //$("#name").val(your_name);

//    names = names.splice(random_idx, 1);



    $(document).on("assign_name", function(event, data) {
       //if(your_name == "noname") {
           your_name = data;
           $("#name").val(your_name);
       //}
    });


    $(document).on("status_update",function(event, data){
        $("#status").append(data+"<br/>");
    });

    /*socket.on("you_lose", function(data) {
        console.log(data);
        $("#winner").html(data.txt);
        alert("you lost");
    });*/

    $(document).on('timer', function (event, data) {
        game.shootCountdown = data;
        //$('#shootoutcountdown').html(data.countdown);
    });

    $('#reset').click(function() {
        $(document).trigger('reset', 15);
    });

    $(document).on("gameover", function(event, data) {
       if(data == your_name) {
           game.setStateByName('victory');
       } else {
           game.setStateByName('death');
       }

    });

    $(".button").click(function(){
        //$("#msgbox").append("Ping server<br>");
        //socket.emit("user_action",{username: name , txt: $(this).attr("data-color") });
        game.playerShoot();
    });

    $('#start').click(function (e){
        e.preventDefault();
        game.setStateByName('opening1');
    });

    // Create a new game and run it.
    game.run();
});