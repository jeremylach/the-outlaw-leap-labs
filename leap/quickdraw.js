(function () {
	window.onload = function() {
		var log = document.getElementById('log'),
			status = document.getElementById('status'),
			controllerOptions = {enableGestures: false};

		function wLog(message) {
			log.innerHTML += '<p>' + message + '</p>';	
		}

		function wStatus(message) {
			status.innerHTML = '<p>' + message + '</p>';		
		}

		wLog('Let\'s Ride!');

		Leap.loop(controllerOptions, function(frame) {
			wStatus(frame);
		});
	}
})();