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
        {name: 'tutorial'},
        {name:'opening1', length: 600, frame: 0},
        //{name:'standoff'},
        {name:'shootout'},
        {name:'defeat'}, {name:'victory'}
    ];
    this.state = 0; // Title

    // global animation timer
    this.global_animation_timer = 0;

    // --images
    this.img_bg = new Image();
    this.img_bg.src = '../assets/bg-sky.png';
    this.img_bg_sun = new Image();
    this.img_bg_sun.src = '../assets/bg-sun.png';
    this.img_bg_ground = new Image();
    this.img_bg_ground.src = '../assets/bg-ground.png';

    this.img_enemy = new Image();
    this.img_enemy.src = '../assets/enemy.png';
    this.img_enemyShadow = new Image();
    this.img_enemyShadow.src = '../assets/enemy-shadow.png';
    this.img_cowboy = new Image();
    this.img_cowboy.src = '../assets/cowboy-idle.png';

    this.img_cowboy_opening1 = new Image();
    this.img_cowboy_opening1.src = '../assets/cowboy-opening1.png';
    this.img_cowboy_shadow_opening1 = new Image();
    this.img_cowboy_shadow_opening1.src = '../assets/cowboy-shadow-opening1.png';
    this.img_cowboy_dead = new Image();
    this.img_cowboy_dead.src = '../assets/cowboy-dead.png';
    this.img_cowboy_dead_shadow = new Image();
    this.img_cowboy_dead_shadow.src = '../assets/cowboy-dead-shadow.png';

    this.img_player_dead = new Image();
    this.img_player_dead.src = '../assets/player-dead.png';
    this.img_player_draw1 = new Image();
    this.img_player_draw1.src = '../assets/player-draw1.png';
    this.img_player_draw2 = new Image();
    this.img_player_draw2.src = '../assets/player-draw2.png';
    this.img_player_fire1 = new Image();
    this.img_player_fire1.src = '../assets/player-fire1.png';
    this.img_player_fire2 = new Image();
    this.img_player_fire2.src = '../assets/player-fire2.png';
    this.img_player_lean_center = new Image();
    this.img_player_lean_center.src = '../assets/player-lean-center.png';
    this.img_player_lean_left = new Image();
    this.img_player_lean_left.src = '../assets/player-lean-left.png';
    this.img_player_lean_right = new Image();
    this.img_player_lean_right.src = '../assets/player-lean-right.png';
    this.img_player_twitch1 = new Image();
    this.img_player_twitch1.src = '../assets/player-twitch1.png';
    this.img_player_twitch2 = new Image();
    this.img_player_twitch2.src = '../assets/player-twitch2.png';
    this.img_player_twitch3 = new Image();
    this.img_player_twitch3.src = '../assets/player-twitch3.png';

    this.playerFrame = {
        img : this.img_player_twitch1,
        length : 10 // In frames
    }

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

    // --tutorial variables
    this.tutorialFired = -1; //TODO:tutorial

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
        if (this.state === 0) {
            game.setStateByName('opening1');
        }


        // The real game is being played.
        if(this.states[this.state].name != 'tutorial') {
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

        // The player is shooting in a tutorial level.
        } else {

            //TODO:tutorial
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

        // Increment the global animation timer
        if(this.state != 0 && this.state != 1) {
            this.global_animation_timer++;
        }

        // The tutorial is occurring.
        if(this.states[this.state].name == 'tutorial') {

            //TODO: tutorial
        }

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

        // The shootout background.
        if(this.states[this.state].name == 'opening1' ||
            this.states[this.state].name == 'shootout' ||
            this.states[this.state].name == 'defeat' ||
            this.states[this.state].name == 'victory')
        {
            this.context.drawImage(this.img_bg_sun,
                (VIEWPORT_WIDTH / 4) - (this.img_bg_sun.width / 2) + ((this.global_animation_timer / 2500) * (VIEWPORT_WIDTH / 8)),
                (this.img_bg_sun.height / 2) - ((this.global_animation_timer / 5000) * (VIEWPORT_WIDTH / 8))
            );
            this.context.drawImage(this.img_bg_ground, (VIEWPORT_WIDTH / 2) - (this.img_bg_ground.width / 2), VIEWPORT_HEIGHT / 2);
        }

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

            // Draw the enemy.
            this.context.drawImage(this.img_enemy,
                ((VIEWPORT_WIDTH / 8) * (4 - ((frame / length) * 1))) - (this.img_enemy.width / 2),
                (VIEWPORT_HEIGHT / 2) - 50
            );
            this.context.drawImage(this.img_enemyShadow,
                ((VIEWPORT_WIDTH / 8) * (4 - ((frame / length) * 1))) - (this.img_enemyShadow.width / 2) + 15,
                (VIEWPORT_HEIGHT / 2) - 50 + this.img_enemy.height
            );
            // Draw the cowboy.
            // this.context.drawImage(this.img_cowboy,
            //     VIEWPORT_WIDTH - ((VIEWPORT_WIDTH / 8) * ((frame / length) * 4)),
            //     (VIEWPORT_HEIGHT / 30)
            // );
            /*this.context.drawImage(this.img_cowboy_opening1, (VIEWPORT_WIDTH / 2) - (this.img_cowboy_opening1.width / 2), (VIEWPORT_HEIGHT / 2) - this.img_cowboy_opening1.height);
            this.context.drawImage(this.img_cowboy_shadow_opening1, (VIEWPORT_WIDTH / 2) - (this.img_cowboy_shadow_opening1.width / 2) + 6, (VIEWPORT_HEIGHT / 2) - 2,
                this.img_cowboy_shadow_opening1.width, this.img_cowboy_shadow_opening1.height * (1 - (.5 * (frame / length))));
            */
            $('#menu').hide();
            $('#instructions').hide();
            $('#start').hide();
        }

        // The standoff update handlers.
        if(this.states[this.state].name == 'standoff') {

        }

        // The shootout is active.
        if(this.states[this.state].name == 'shootout') {

            // Draw the enemy.
            this.context.drawImage(this.img_enemy,
                ((VIEWPORT_WIDTH / 8) * 3) - (this.img_enemy.width / 2),
                (VIEWPORT_HEIGHT / 2) - 50
            );
            this.context.drawImage(this.img_enemyShadow,
                ((VIEWPORT_WIDTH / 8) * 3) - (this.img_enemyShadow.width / 2) + 15,
                (VIEWPORT_HEIGHT / 2) - 50 + this.img_enemy.height,
                this.img_enemyShadow.width,
                this.img_enemyShadow.height
            );
            // Draw the cowboy.
            this.context.drawImage(this.img_cowboy,
                VIEWPORT_WIDTH - (VIEWPORT_WIDTH / 8) * 4,
                (VIEWPORT_HEIGHT / 30)
            );
            /*
            // Draw the cowboy.
            this.context.drawImage(this.img_cowboy, (VIEWPORT_WIDTH / 2) - (this.img_cowboy.width / 2), (VIEWPORT_HEIGHT / 2) + 20);
            this.context.drawImage(this.img_cowboy_shadow_opening1, (VIEWPORT_WIDTH / 2) - (this.img_cowboy_shadow_opening1.width / 2) + 6, (VIEWPORT_HEIGHT / 2) + 80,
                this.img_cowboy_shadow_opening1.width, this.img_cowboy_shadow_opening1.height * .38);
            */
        }

        // The player has been defeated.
        if(this.states[this.state].name == 'defeat') {

            // Draw the enemy.
            this.context.drawImage(this.img_enemy,
                ((VIEWPORT_WIDTH / 8) * 3) - (this.img_enemy.width / 2),
                (VIEWPORT_HEIGHT / 2) - 50
            );
            this.context.drawImage(this.img_enemyShadow,
                ((VIEWPORT_WIDTH / 8) * 3) - (this.img_enemyShadow.width / 2) + 15,
                (VIEWPORT_HEIGHT / 2) - 50 + this.img_enemy.height,
                this.img_enemyShadow.width,
                this.img_enemyShadow.height
            );

            // Draw the player
            this.context.drawImage(this.img_player_dead, VIEWPORT_WIDTH - 400, 100);
        }

        // The player is victorious.
        if(this.states[this.state].name == 'victory') {

            // Draw the cowboy.
            this.context.drawImage(this.img_cowboy_dead, (VIEWPORT_WIDTH / 2) - (this.img_cowboy.width / 2) - 8, (VIEWPORT_HEIGHT / 2) + 43);
            this.context.drawImage(this.img_cowboy_dead_shadow, (VIEWPORT_WIDTH / 2) - (this.img_cowboy_dead_shadow.width / 2) - 8, (VIEWPORT_HEIGHT / 2) + 68,
                this.img_cowboy_dead_shadow.width, this.img_cowboy_dead_shadow.height * .38);
        }

        // Any state where the player is alive

        if(this.states[this.state].name == 'victory' || this.states[this.state].name == 'opening1' || this.states[this.state].name == 'shootout') {
            this.context.drawImage(this.playerFrame.img, VIEWPORT_WIDTH - 400, 100);
            // if (this.playerShot) {
            //     this.context.drawImage(this.img_player_lean_center, VIEWPORT_WIDTH - 400, 100);
            // } else {
            //     this.context.drawImage(this.img_player_twitch1, VIEWPORT_WIDTH - 400, 100);
            // }
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
var names = ["Gassy Bill", "Jon The Kid", "Asian Will", "White Will", "Craigy", "Goofy Frank", "Curly Larry", "The Basecamp Buckaroo"];

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