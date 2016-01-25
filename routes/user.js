var express = require('express');
var router = express.Router();

/* GET users Location. */
router.post('/', function(req, res, next) {

	var loc = req.body;
	console.log(loc);
  	res.status(200).send(loc);
});

module.exports = router;
