(function () {
	window.onload = function() {
		var log = document.getElementById('log'),
			status = document.getElementById('status'),
			directionElem = document.getElementById('direction'),
			pointing = false,
			controllerOptions = {enableGestures: false};

		function wLog(message) {
			log.innerHTML += '<p>' + message + '</p>';	
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

		wLog('Let\'s Ride!');

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
				if (!pointing) {
					wLog('BANG!');
					console.dir(gunFinger.direction);
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