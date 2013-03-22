(function () {
	window.onload = function() {
		var log = document.getElementById('log'),
			status = document.getElementById('status'),
			directionElem = document.getElementById('direction'),
			pointing = false,
			controllerOptions = {enableGestures: false},
			waggleTolerance = {
				minX : -.25,
				maxX : .25,
				minY : -.25,
				maxY : .25
			},
			reloadTime = 1000, // Min time in between shots, in milliseconds.
			reloading = false; // Have we shot recently? If so, we are 'reloading' and can't shoot again for a bit.

		function wLog(message) {
			log.innerHTML += '<span> ' + message + '</span>';	
		}

		function cleanLog() {
			// var firstItem = log.querySelectorAll('p:first-child');
			// console.log(firstItem);
			// firstItem.innerHTML = 'Cleaned';
			// log.removeChild(firstItem);
			log.innerHTML = '';
		}

		function wStatus(message) {
			status.innerHTML = '<p>' + message + '</p>';		
		}

		function roundToOne(num) {
			return Math.round(num * 100) / 100;
		}

		function wDirection(direction) {
			directionElem.innerHTML = '';
			if (direction === '') {
				directionElem.innerHTML = "I can't see anything.";
				return;
			}
			directionElem.innerHTML += " <b>X:</b> " + roundToOne(direction[0]);
			directionElem.innerHTML += " <b>Y:</b> " + roundToOne(direction[1]);
			directionElem.innerHTML += " <b>Z:</b> " + roundToOne(direction[2]);
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

		wLog('Let\'s Ride!');

		//var logTimeout = window.setInterval(cleanLog, 5000);

		Leap.loop(controllerOptions, function(frame) {
			var status = '',
				gunFinger,
				reloadTimeout;

			// Log data about the fingers we see.
			if (frame.pointables.length === 0) {
				status += 'I can\'t see you.';
			} else {
				status += 'I can see ' + frame.pointables.length + ' pointable(s). ';
			}
			if (pointing) {
				status += ' You are pointing.';
			}

			if (frame.pointables.length === 1) {
				gunFinger = frame.pointables[0];
				wDirection(gunFinger.direction);

				if (!pointing && checkWaggle(gunFinger.direction) && reloading) {
					wLog('You tried to fire but were reloading.');
				}

				if (!pointing && checkWaggle(gunFinger.direction) && !reloading) {
					wLog('BANG!');
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
				wDirection('');
			}

			wStatus(status);
		});
	}
})();