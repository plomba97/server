var express = require('express');
var Person = require('../data-models/person-model.js');
var router = express.Router();
var callManager = require('../services/calls-manager');

router.get('/calls', function(req, res, next) {
    var calls = callManager.createManager({ari:{}, maxCalls: 10, appName: 'testPeople'}).calls;
    console.log({calls: calls});
    res.send({calls: calls});
});

module.exports = router;

