(function () {

	// TODO: Consider redoing this to not us a global variable.
	quickDrawFinger = {
		pointing : false,
		leaning : 'center' // Possible values: left, right, center
	}
	window.onload = function() {
		var pointing = false,
			controllerOptions = {enableGestures: false},
			waggleTolerance = {
				minX : -.3,
				maxX : .3,
				minY : -.3,
				maxY : .3
			},
			reloadTime = 1000, // Min time in between shots, in milliseconds.
			reloading = false; // Have we shot recently? If so, we are 'reloading' and can't shoot again for a bit. This prevents rapid fire in cases where the pointer jumps out of range and then back in.

		function roundToOne(num) {
			return Math.round(num * 100) / 100;
		}

		function checkWaggle(direction) {
			// In a perfect world, if the user is pointing directly at the screen, X would be 0 and Y would be 0.
			var passX,
				passY,
				dirX = direction[0],
				dirY = direction[1];

			if (dirX >= waggleTolerance.minX && dirX <= waggleTolerance.maxX) {
				passX = true;
			} else {
				passX = false;
				
			}
			if (dirY >= waggleTolerance.minY && dirY <= waggleTolerance.maxY) {
				passY = true;
			} else {
				passY = false;
			}
			//wLog('waggle X: ' + dirX + ' ' + passX + ' waggle Y: ' + dirY + ' ' + passY);
			return (passX && passY);
		}

		Leap.loop(controllerOptions, function(frame) {
			var status = '',
				gunFinger,
				reloadTimeout;

			if (frame.pointables.length === 1) {
				gunFinger = frame.pointables[0];
				if (!pointing && checkWaggle(gunFinger.direction) && reloading) {
					// Player tried to fire but was "reloading". An animation or something might go here in the future.
				}

				if (!pointing && checkWaggle(gunFinger.direction) && !reloading) {
					// Call shoot event.
					game.playerShoot();
					reloading = true;
					reloadTimeout = window.setTimeout(function() {
						reloading = false;
					}, reloadTime);
				}
			}

			if (frame.pointables.length > 0) {
				pointing = true;
			} else {
				pointing = false;
			}
		});
	}
})();