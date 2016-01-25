var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('request');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
	async.parallel([
		function(callback) {
			var path = config.apiDomain + config.apiLocation + config.apiFormat + '&APPID=' + config.apiKey;
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
		console.log(weather);
  		res.render('index', weather);
	}
	);

});

module.exports = router;
