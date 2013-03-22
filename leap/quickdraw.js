(function () {
	window.onload = function() {
		var log = document.getElementById('log'),
			status = document.getElementById('status'),
			directionElem = document.getElementById('direction'),
			pointing = false,
			controllerOptions = {enableGestures: false},
			waggleTolerance = {
				minX : -.1,
				maxX : .1,
				minY : -.1,
				maxY : .1
			}


		function wLog(message) {
			log.innerHTML += '<p>' + message + '</p>';	
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
				passY;
			if (direction[0] >= waggleTolerance.minX && direction[0] <= waggleTolerance.maxX) {
				passX = true;
			} else {
				passX = false;
				
			}
			if (direction[0] >= waggleTolerance.minY && direction[0] <= waggleTolerance.maxY) {
				passY = true;
			} else {
				passY = false;
			}
			wLog('waggle X: ' + passX + ' waggle Y: ' + passY);
			return (passX && passY);
		}

		wLog('Let\'s Ride!');

		var logTimeout = window.setInterval(cleanLog, 5000);

		Leap.loop(controllerOptions, function(frame) {
			var status = '',
				gunFinger;

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

				if (!pointing && checkWaggle(gunFinger.direction)) {
					wLog('BANG!');
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