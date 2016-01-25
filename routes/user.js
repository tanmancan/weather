var express = require('express');
var router = express.Router();

/* GET users Location. */
router.get('/', function(req, res, next) {

	var loc = req.query;
	console.log(loc);
  res.send('respond with a resource');
});

module.exports = router;
