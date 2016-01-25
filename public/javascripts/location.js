(function(){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(sendUserLocation);
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
					break;
			}
		};
		xhr.open('POST', '/user', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("lat=" + encodeURIComponent(currPos.coords.latitude) + "&lon=" + encodeURIComponent(currPos.coords.longitude));
	}
})();