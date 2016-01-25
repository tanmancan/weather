window.onload = function() {
	var html = document.querySelector('html');
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(sendUserLocation, locationErr);
	}
	function locationErr(err) {
		html.innerHTML = "ERROR:" + err;
	}
	function sendUserLocation(pos) {
		var currPos = pos;
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				switch (xhr.status) {
					case 200:
						weatherData = xhr.responseText;
						renderPage('weather', JSON.parse(weatherData));
						break;
					case 400:
					case 403:
					case 500:
						html.innerHTML = "Could not load weather info!";
						break;
				}
			}
		};
		xhr.open('POST', '/', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("lat=" + encodeURIComponent(currPos.coords.latitude) + "&lon=" + encodeURIComponent(currPos.coords.longitude));
	}
}
