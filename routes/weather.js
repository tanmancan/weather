var config = ('API_KEY' in process.env) ? process.env.API_KEY : require('../config');
var request = require('request');
var async = require('async');

	console.log('Variable config:', config);
	console.log('Variable apiKey:', config.apiKey);
	console.log('Variable apiLocation:', config.apiLocation);
	console.log('Environ config:', process.env.API_KEY);
module.exports = {
	render: function(req, res) {
		var loc = req.body;
		var apiLocation = process.env.API_LOCATION || config.apiLocation,
			apiWeather = process.env.API_WEATHER || config.apiWeather,
			apiUnits = process.env.API_UNITS || config.apiUnits,
			apiKey = process.env.API_KEY || config.apiKey,
			apiForecast = process.env.API_FORECAST || config.apiForecast;
		if(loc.lat && loc.lon) {
			apiLocation = "?lat=" + loc.lat + "&lon=" + loc.lon;
		}

		async.parallel([
			function(callback) {
				var path = apiWeather + apiLocation + apiUnits + '&APPID=' + apiKey;
				request(path, function(err, res, body) {
					if(err) {console.log(err); callback(true); return;}
					obj = JSON.parse(body);
					callback(false, obj);
				});
			},
			function(callback) {
				var path = apiForecast + apiLocation + apiUnits + "&APPID=" + apiKey;
				request(path, function(err, res, body) {
					if(err) {console.log(err); callback(true); return;}
					obj = JSON.parse(body);
					callback(false, obj);
				});
			},
		],

		function(err, results) {
			var weather,
				windDirection;

			if(err) {console.log(err); res.send(500, 'Server Error'); return;}
			weather = results[0];
			weather.forecast = results[1];

			windDirection = weather.wind.deg;

			function compassDirection(deg) {
				var directions = [
					'n','nne','ne','ene','e','ese','se','sse','s','ssw','sw','wsw','w','wnw','nw','nww'
				];
				var key = Math.floor((deg / 22.5) + .5);
				return directions[key % 16];
			}
			weather.wind.direction = compassDirection(windDirection);

			weather.main.temp = Math.round(weather.main.temp);

			var dailyForecast = [];
			var today = new Date();

			Object.keys(weather.forecast.list).forEach(function(key) {
				var _this = weather.forecast.list[key];
				var date = new Date(_this.dt_txt),
					day = date.getDay;


				windDirection = _this.wind.deg;
				_this.wind.direction = compassDirection(windDirection);

				_this.main.temp = Math.round(_this.main.temp);

				_this.date = date.toDateString();

				if (date.getHours() === 15 && today.getDate() != date.getDate()) {
					dailyForecast.push(_this);
				}
			});

			weather.forecast_daily = dailyForecast;

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