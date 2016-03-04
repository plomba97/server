var express = require('express');
var Person = require('../data-models/person-model.js');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {signedUser: req.user});
});

module.exports = router;
