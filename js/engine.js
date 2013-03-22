var VIEWPORT_WIDTH = 1000;
var VIEWPORT_HEIGHT = 700;

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
    /*this.states = [
        {name:'opening1'},
        {name:'shootout'},
        {name:'defeat'},
        {name:'victory'}
    ];*/
    this.state = 'shootout';//this.states[0].name;

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

    this.img_cowboy = new Image();
    this.img_cowboy.src = '../assets/cowboy.png';

    // --background music
    this.bgMusic = new Audio('../assets/sound/music/western_music.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.play();

    // --sound effects
    this.sfx_gunfire = new Audio('../assets/sound/sfx/gun_fire.wav');

    // --shootout variables
    this.shootCountdown = 600;
    this.readyToShoot = false;

    this.playerShootInput = false;
    this.playerShot = false;

    this.enemyAI = enemyAI;
    this.enemyShootCountdown = 200; // For AI
    this.enemyShootInput = false;
    this.enemyShot = false;

    //------ Helper Functions ------//

    // Trigger when the player shoots.
    this.playerShoot = function() {

        // The player is allowed to shoot and fires.
        if(this.readyToShoot){
            this.playerShootInput = true;
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
        if(this.state == 'opening1') {

        }

        // The shootout update handlers.
        if(this.state == 'shootout') {
            $('#shootoutcountdown').html(this.shootCountdown);
            $('#playershot').html(this.playerShot);
            $('#enemyshootcountdown').html(this.enemyShootCountdown);
            $('#enemyshot').html(this.enemyShot);

            // If the shoot countdown is over, stop the
            // music and allow the player to shoot.
            if(this.shootCountdown == 0) {
                this.bgMusic.pause();
                this.readyToShoot = true;
                this.shootCountdown--;
            // Otherwise, continue counting down.
            } else if(this.shootCountdown > 0) {
                this.shootCountdown--;
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
                // TODO: kill the enemy
            }

            // If the enemy has shot first, kill the player.
            if(this.enemyShootInput && this.playerShot == false && this.enemyShot == false) {
                // do something
                this.enemyShot = true;
                this.sfx_gunfire.play();
                // TODO: kill the player
            }
        }

        // The player has been defeated.
        if(this.state == 'defeat') {

        }

        // The player is victorious.
        if(this.state == 'victory') {

        }
    }

    // Render the current state of the game to the viewport.
    this.draw = function() {

        // The first part of the opening is occurring.
        if(this.state == 'opening1') {
            this.context.drawImage(this.img_cowboy_shadow_opening1, (VIEWPORT_WIDTH / 2) - (this.img_cowboy.width / 2), (VIEWPORT_HEIGHT / 2) + 20)
        }

        // The shootout is active.
        if(this.state == 'shootout') {
            // Draw the background.
            this.context.drawImage(this.img_bg, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
            this.context.drawImage(this.img_bg_sun, (VIEWPORT_WIDTH / 2) - (this.img_bg_sun.width / 2), -(this.img_bg_sun.height / 4));
            this.context.drawImage(this.img_bg_ground, (VIEWPORT_WIDTH / 2) - (this.img_bg_ground.width / 2), VIEWPORT_HEIGHT / 2);
            // Draw the cowboy.
            this.context.drawImage(this.img_cowboy, (VIEWPORT_WIDTH / 2) - (this.img_cowboy.width / 2), (VIEWPORT_HEIGHT / 2) + 20);
        }

        // The player has been defeated.
        if(this.state == 'defeat') {

        }

        // The player is victorious.
        if(this.state == 'victory') {

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
        var gameInterval = setInterval(function() { gameRef.gameLoop(); }, 1000 / Game.fps);
    }

    // Stop the game.
    this.stop = function() {

        if(this.gameInterval != null) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
    }
}

var game;

// When the document is ready
$(document).ready(function(){

    // Create a new game and run it.
    var game = new Game(true);
    game.run();
});