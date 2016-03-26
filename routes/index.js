var express = require('express');
var Person = require('../data-models/person-model.js');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {signedUser: req.user});
});

module.exports = router;
