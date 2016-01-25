var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', weather.nouser);

router.post('/' weather.user);



module.exports = router;
