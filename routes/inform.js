var _ = require('underscore');
var express = require('express');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var router = express.Router();
var ariInit = require('../ari/ari-init.js');
var call = require('../services/call.js');
var callManager = require('../services/calls-manager');

//Route: /inform Method:GET - Renders groups
router.get('/', function(req, res, next) {
    Group.find().exec(function(err, groups) {

        res.render('inform-screen', { groups: groups });
    });
});

//Route: /inform Method:Post - Renders groups
router.post('/', function(req, res, next) {
    console.log(req.body);
    var recordingId = req.body.recording;
    var groupIds = req.body.ids;
    var phones = [];

    Person.find({groups : {"$in":groupIds}}).exec(function(err, data) {
        _.each(data, function(person){
            _.each(person.phones, function(phone){
                if(phone.number != ''){
                    phones.push(phone);
                }
            });
        });
        console.log(phones);

        ariInit.getClient({}, 'testPeople')
            .then(function (client) {
                //console.log(client);
                var manager = callManager.createManager({ari:client, maxCalls: 10, appName: 'testPeople'});
                _.each(phones, function(phone){
                    callToAdd = call.makeCall({endPoint:'SIP/asterisk2/' + phone.number, priority: phone.priority, attempts: phone.attempts});
                    manager.addCall(callToAdd);
                });
                manager.startCalls();
                console.log(manager);
            });
        res.sendStatus(200);
    });
});

//Route: /inform/callsData Method:GET - Renders groups
router.get('/callsData', function(req, res, next) {
    var calls = callManager.createManager({ari:{}, maxCalls: 10, appName: 'testPeople'}).calls;
    console.log({calls: calls});
    res.send({calls: calls});
});

//Route: /inform/callsData Method:GET - Renders groups
router.get('/calls', function(req, res, next) {
    res.render('current-calls', {});
});



module.exports = router;
