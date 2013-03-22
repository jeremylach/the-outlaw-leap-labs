(function () {
	window.onload = function() {
		var log = document.getElementById('log'),
			status = document.getElementById('status'),
			pointing = false,
			controllerOptions = {enableGestures: false};

		function wLog(message) {
			log.innerHTML += '<p>' + message + '</p>';	
		}

		function wStatus(message) {
			status.innerHTML = '<p>' + message + '</p>';		
		}

		wLog('Let\'s Ride!');

		Leap.loop(controllerOptions, function(frame) {
			var status = '';
			if (frame.pointables.length === 0) {
				status += 'I can\'t see you.';
			} else {
				status += 'I can see ' + frame.pointables.length + ' pointable(s). ';
			}
			if (pointing) {
				status += ' You are pointing.';
			}

			wStatus(status);
			if (frame.pointables.length === 1) {
				if (!pointing) {
					wLog('BANG!');
				}
				//pointing = true;
			}

			if (frame.pointables.length > 0) {
				pointing = true;
			} else {
				pointing = false;
			}
		});
	}
})();