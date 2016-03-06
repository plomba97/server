var _ = require('underscore');
var express = require('express');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var CallsLog = require('../data-models/calls-data-model.js');
var router = express.Router();
var callManager = require('../services/asterisk/calls-manager');

router.get('/calls', function(req, res, next) {
    var objToSend = {};
    objToSend.calls = [];
    var calls = callManager.getManager().calls;
    res.render('inform/current-calls-data', {calls: calls});
});

router.get('/personInfo/:id', function(req, res, next) {
    var personId = req.params.id;
    Person.findOne({_id: personId}).populate('groups').exec(function(err, data) {
        res.render('people/person-info', {person: data});
    });
});

router.get('/groupInfo/:id', function(req, res, next) {
    var groupId = req.params.id;
    Group.findOne({_id: groupId}).populate('people').exec(function(err, data) {
        res.render('groups/group-info', {group: data});
    });
});

router.get('/callsInfo/:id', function(req, res, next) {
    var callsId = req.params.id;
    CallsLog.findOne({_id: callsId}).populate('people').exec(function(err, data) {
        res.render('inform/history-info', {calls: (data.calls) ? data.calls : {}});
    });
});


module.exports = router;

