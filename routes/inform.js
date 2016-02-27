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
                var manager = callManager({ari:client, maxCalls: 10, appName: 'originate-test'});
                _.each(phones, function(phone){
                    call = Object.create(call).init({endPoint:'SIP/asterisk2/' + phone.number, priority: phone.priority, attempts: phone.attempts});
                    manager.addCall(call);
                });
                console.log(manager);
            });
        res.sendStatus(200);
    });
});


module.exports = router;
