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

    // --images
    this.img_bg = new Image();
    this.img_bg.src = '../assets/bg-sky.png';
    this.img_bg_sun = new Image();
    this.img_bg_sun.src = '../assets/bg-sun.png';

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

        }
    }

    // Trigger when the enemy shoots.
    this.enemyShoot = function() {

        // The enemy is allowed to shoot and fires.
        if(this.readyToShoot){
            this.enemyShootInput = true;
        // The enemy is not allowed to shoot.
        } else {

        }
    }

    //------- Main Functions -------//

    // Update the game for one tick of the world time.
    this.update = function() {

        $('#shootoutcountdown').html(this.shootCountdown);
        $('#playershot').html(this.playerShot);
        $('#enemyshootcountdown').html(this.enemyShootCountdown);
        $('#enemyshot').html(this.enemyShot);

        // If the shoot countdown is over, stop the
        // music and allow the player to shoot.
        if(this.shootCountdown <= 0) {
            this.bgMusic.pause();
            this.readyToShoot = true;
        // Otherwise, continue counting down.
        } else {
            this.shootCountdown--;
        }

        // If the enemy is under AI control.
        if(this.enemyAI && this.readyToShoot) {

            // If the enemy is ready to shoot, make them shoot.
            if(this.enemyShootCountdown <= 0) {
                this.enemyShoot();
            // Otherwise, continue counting down.
            } else {
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

    // Render the current state of the game to the viewport.
    this.draw = function() {

        // Draw the background.
        this.context.drawImage(this.img_bg, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        this.context.drawImage(this.img_bg_sun, 0, 0);
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

// When the document is ready
$(document).ready(function(){

    // Create a new game and run it.
    var game = new Game(true);
<<<<<<< HEAD
    //game.run();
});

=======
    game.run();
});
>>>>>>> 370333adf3d07a4d3897ee70203c39fa7191de94
