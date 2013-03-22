// The game object.
function Game(enemyAI) {

    //------ Member Variables ------//

    this.canvas = document.getElementById('viewport');
    this.context = this.canvas.getContext('2d');

    this.fps = 30;
    this.gameInterval = null;

    this.bgMusic = new Audio('../assets/sound/western_music.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.play();

    this.shootCountdown = 300;
    this.readyToShoot = false;

    this.playerShootInput = false;
    this.playerShot = false;

    this.enemyAI = enemyAI;
    this.enemyShootCountdown = 90; // For AI
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
        if(this.enemyAI) {

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
            // TODO: kill the enemy
        }

        // If the enemy has shot first, kill the player.
        if(this.enemyShootInput && this.playerShot == false && this.enemyShot == false) {
            // do something
            this.enemyShot = true;
            // TODO: kill the player
        }
    }

    // Render the current state of the game to the viewport.
    this.draw = function() {

        //TODO
    }

    // The main game loop; updates and draws.
    this.gameLoop = function() {

        this.update();
        this.draw();
    }

    // Run the game.
    this.run = function() {

        var gameInterval = setInterval(this.gameLoop, 1000 / Game.fps);
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
    //game.run();
});