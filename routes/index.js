var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('request');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
