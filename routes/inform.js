var _ = require('underscore');
var express = require('express');
var passport = require('passport');
var Account = require('../data-models/account-model');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var CallsLog = require('../data-models/calls-data-model.js');
var Recording = require('../data-models/recording-model.js');
var router = express.Router();
var ariInit = require('../ari/ari-init.js');
var call = require('../services/asterisk/call.js');
var callManager = require('../services/asterisk/calls-manager');

function checkIfAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/users/login");
    }
}
//Route: /inform Method:GET - Renders groups
router.get('/', checkIfAuthenticated, function(req, res, next) {
    Group.find().exec(function(err, groups) {
        Recording.find().exec(function(err, recordings) {
            console.log(req.user);
            res.render('inform/inform-screen', {signedUser: req.user, groups: groups, recordings: recordings });
        });
    });
});

//Route: /inform Method:Post - Renders groups
router.post('/', checkIfAuthenticated, function(req, res, next) {
    console.log(req.body);
    var recordingId = req.body.recording;
    var groupIds = req.body.ids;
    var informName = req.body.name;

    ariInit.getClient({}, 'testPeople')
        .then(function (client) {
            Recording.findOne({_id: recordingId}).exec(function(err, recording) {
                var manager = callManager.createManager({ari:client, maxCalls: 10, appName: 'testPeople', name: informName, recording: recording.path});

                Person.find({groups : {"$in":groupIds}}).exec(function(err, data) {
                    _.each(data, function(person){
                        _.each(person.phones, function(phone){
                            if(phone.number != ''){
                                var callToAdd = call.makeCall({destination:{firstName: person.firstName, secondName: person.secondName, lastName: person.lastName, number: phone.number}, priority: phone.priority, attempts: phone.attempts});
                                manager.addCall(callToAdd);
                            }
                        });
                    });
                    manager.startCalls();
                    res.sendStatus(200);
            });

            });
        });
});

//Route: /inform/callsData Method:GET - Renders groups
router.get('/calls', checkIfAuthenticated, function(req, res, next) {
    res.render('inform/current-calls', {signedUser: req.user});
});

router.get('/history', checkIfAuthenticated, function(req, res, next) {
    CallsLog.find().exec(function(err, logs) {
        res.render('inform/calls-history', {signedUser: req.user, logs: logs});
    });
});

module.exports = router;
