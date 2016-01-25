var config = require('../config');
var request = require('request');
var async = require('async');

module.exports = {
	render: function(req, res) {
		var loc = req.body;
		var apiLocation = config.apiLocation;
		if(loc.lat && loc.lon) {
			console.log(loc.lat);
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
			var weather;
			if(err) {console.log(err); res.send(500, 'Server Error'); return;}
			weather = results[0];
			// console.log(weather);
	  		res.render('index', weather);
		}
		);
	}

};