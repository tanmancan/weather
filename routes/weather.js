var config = require('../config');
var request = require('request');
var async = require('async');

module.exports = {
	render: function(req, res) {
		var loc = req.body;
		var apiLocation = config.apiLocation;
		if(loc.lat && loc.lon) {
			apiLocation = "?lat=" + loc.lat + "&lon=" + loc.lon;
		}

		async.parallel([
			function(callback) {
				var path = config.apiDomain + apiLocation + config.apiFormat + '&APPID=' + config.apiKey;
				request(path, function(err, res, body) {
					if(err) {console.log(err); callback(true); return;}
					obj = JSON.parse(body);
					callback(false, obj);
				});
			}
		],

		function(err, results) {
			var weather,
				windDirection;
			if(err) {console.log(err); res.send(500, 'Server Error'); return;}
			weather = results[0];
			windDirection = weather.wind.deg;

			function compassDirection(deg) {
				var directions = [
					'n','nne','ne','ene','e','ese','se','sse','s','ssw','sw','wsw','w','wnw','nw','nww'
				];
				var key = Math.floor((deg / 22.5) + .5);
				return directions[key % 16];
			}
			weather.wind.direction = compassDirection(windDirection);

			var sunrise = new Date(weather.sys.sunrise * 1000),
				sunset = new Date(weather.sys.sunset * 1000);

			weather.sys.sunrise = sunrise.toLocaleTimeString();
			weather.sys.sunset = sunset.toLocaleTimeString();

	  		res.send(weather);
		}
		);
	},
	
	loader: function(req, res) {
		res.render('loader');
	},

	dev: function(req, res) {
		res.render('loader');
	},

};