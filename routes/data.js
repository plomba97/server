var _ = require('underscore');
var express = require('express');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var CallsLog = require('../data-models/calls-data-model.js');
var router = express.Router();
var callManager = require('../services/asterisk/calls-manager')

function checkIfAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/users/login");
    }
}

router.get('/calls', checkIfAuthenticated, function(req, res, next) {
    var objToSend = {};
    objToSend.calls = [];
    var manager = callManager.getManager();
    //console.log(manager);
    if(manager.state  == 'Working'){
        var calls = callManager.getManager().calls;
        res.render('inform/current-calls-data', {calls: calls});
    }
    else {
        res.render('partials/err', {title: 'Няма активоно оповестяване', errors: {}});
    }
});

router.get('/personInfo/:id', checkIfAuthenticated, function(req, res, next) {
    var personId = req.params.id;
    Person.findOne({_id: personId}).populate('groups').exec(function(err, data) {
        res.render('people/person-info', {person: data});
    });
});

router.get('/groupInfo/:id', checkIfAuthenticated, function(req, res, next) {
    var groupId = req.params.id;
    Group.findOne({_id: groupId}).populate('people').exec(function(err, data) {
        res.render('groups/group-info', {group: data});
    });
});

router.get('/callsInfo/:id', checkIfAuthenticated, function(req, res, next) {
    var callsId = req.params.id;
    CallsLog.findOne({_id: callsId}).populate('people').exec(function(err, data) {
        res.render('inform/history-info', {calls: (data.calls) ? data.calls : {}});
    });
});


module.exports = router;

