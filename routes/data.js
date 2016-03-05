var _ = require('underscore');
var express = require('express');
var Person = require('../data-models/person-model.js');
var router = express.Router();
var callManager = require('../services/asterisk/calls-manager');

router.get('/calls', function(req, res, next) {
    var objToSend = {};
    objToSend.calls = [];
    var calls = callManager.getManager().calls;
    res.render('current-calls-data', {calls: calls});
});

module.exports = router;

