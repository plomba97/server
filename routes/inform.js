var _ = require('underscore');
var express = require('express');
var passport = require('passport');
var Account = require('../data-models/account-model');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var router = express.Router();
var ariInit = require('../ari/ari-init.js');
var call = require('../services/call.js');
var callManager = require('../services/calls-manager');

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
        console.log(req.user);
        res.render('inform-screen', {signedUser: req.user, groups: groups });
    });
});

//Route: /inform Method:Post - Renders groups
router.post('/', checkIfAuthenticated, function(req, res, next) {
    console.log(req.body);
    var recordingId = req.body.recording;
    var groupIds = req.body.ids;

    ariInit.getClient({}, 'testPeople')
        .then(function (client) {
            var manager = callManager.createManager({ari:client, maxCalls: 10, appName: 'testPeople'});

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

//Route: /inform/callsData Method:GET - Renders groups
router.get('/calls', checkIfAuthenticated, function(req, res, next) {
    res.render('current-calls', {signedUser: req.user});
});

module.exports = router;
