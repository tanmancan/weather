(function(){
	var html = document.querySelector('html');
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(sendUserLocation, locationErr);
	}
	function locationErr(err) {
		html.innerHTML = "Could not get user location!";
	}
	function sendUserLocation(pos) {
		var currPos = pos;
		console.log(currPos);
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			console.log(xhr);
			switch (xhr.status) {
				case 200:
					console.log(xhr.status);
					console.log(xhr.responseText);
					html.innerHTML = xhr.responseText;
					break;
				default:
					html.innerHTML = "Could not load weather info!";
					break;
			}
		};
		xhr.open('POST', '/', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("lat=" + encodeURIComponent(currPos.coords.latitude) + "&lon=" + encodeURIComponent(currPos.coords.longitude));
	}
})();