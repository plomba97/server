var _ = require('underscore');
var express = require('express');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var CallsLog = require('../data-models/calls-data-model.js');
var Account = require('../data-models/account-model');
var router = express.Router();
var callManager = require('../services/asterisk/calls-manager');

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

router.get('/userInfo/:id', checkIfAuthenticated, function(req, res, next) {
    var userId = req.params.id;
    Account.findOne({_id: userId}).populate('people').exec(function(err, data) {
        console.log(data);
        res.render('users/user-info', {user: data});
    });
});

router.post('/usersList', checkIfAuthenticated, function(req, res, next) {
    var draw = parseInt(req.body.draw);
    var skip = parseInt(req.body.start);
    var take = parseInt(req.body.length);
    var colMap = ["title", "firstName", "secondName", "lastName", "jobTitle", ""];
    var orderCol = req.body['order[0][column]'] - 2;
    var orderDir = req.body['order[0][dir]'];
    var colNmae = colMap[orderCol];
    var filterQuery = req.body['search[value]'];
    var filterRegex = new RegExp(filterQuery, 'i');

    Person.count({ 'isDeleted': false})
        .or([{ 'firstName': { $regex: filterRegex }},
            { 'secondName': { $regex: filterRegex }},
            { 'lastName': { $regex: filterRegex }},
            { 'title': { $regex: filterRegex }},
            { 'jobTitle': { $regex: filterRegex }}])
        .exec(function(err, count){
        Person.find({ 'isDeleted': false})
            .or([{ 'firstName': { $regex: filterRegex }},
                { 'secondName': { $regex: filterRegex }},
                { 'lastName': { $regex: filterRegex }},
                { 'title': { $regex: filterRegex }},
                { 'jobTitle': { $regex: filterRegex }}])
            .populate('groups').limit(take)
            .skip(skip)
            .sort(orderDir == 'asc' ? colNmae : '-'+colNmae)
            .exec(function(err, data) {
                var dataToSend = {
                    "draw": draw,
                    "recordsTotal": count,
                    "recordsFiltered": count,
                    "data": []
                };
                if(err || !data[0]){
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(dataToSend));
                    return;
                }
                var index = skip + 1;
                data.forEach(function(element){
                    var groups=[];
                    if(!element.groups[0]){
                        groups.push('-');
                    }
                    else{
                        element.groups.forEach(function(group){
                            groups.push(' ' + group.name);
                        });
                    }
                    if(!element.isDeleted){
                        dataToSend.data.push([ element._id, index, element.title, element.firstName, element.secondName, element.lastName, element.jobTitle, groups ]);
                        index++;
                    }
                });
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(dataToSend));
        });
    });
});

router.post('/groupsList', checkIfAuthenticated, function(req, res, next) {
    var draw = parseInt(req.body.draw);
    var skip = parseInt(req.body.start);
    var take = parseInt(req.body.length);
    var colMap = ["name", "comment", "people"];
    var orderCol = req.body['order[0][column]'] - 2;
    var orderDir = req.body['order[0][dir]'];
    var colNmae = colMap[orderCol];
    var filterQuery = req.body['search[value]'];
    var filterRegex = new RegExp(filterQuery, 'i');

    Group.count({'isDeleted': false})
        .or([{ 'name': { $regex: filterRegex }},
            { 'comment': { $regex: filterRegex }}])
        .exec(function(err, count){
        Group.find({'isDeleted': false})
            .or([{ 'name': { $regex: filterRegex }},
                { 'comment': { $regex: filterRegex }}])
            .populate('people').limit(take)
            .skip(skip)
            .sort(orderDir == 'asc' ? colNmae : '-'+colNmae)
            .exec(function(err, data) {
                var dataToSend = {
                    "draw": draw,
                    "recordsTotal": count,
                    "recordsFiltered": count,
                    "data": []
                };
                if(err || !data[0]){
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(dataToSend));
                    return;
                }
                var index = skip + 1;
                data.forEach(function(element){
                    if(!element.isDeleted){
                        dataToSend.data.push([ element._id, index, element.name, element.comment, element.people.length ]);
                        index++
                    }
                });
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(dataToSend));
        });
    });
});

router.post('/updateUser/:id', checkIfAuthenticated, function(req, res, next) {
    var id = req.params.id;
    var updatedPerson = req.body.updatedPerson;
    Person.findOne({ _id: id }, function (err, doc){
        if(err){
        }
        doc.title = updatedPerson.title;
        doc.firstName = updatedPerson.firstName;
        doc.secondName = updatedPerson.secondName;
        doc.lastName = updatedPerson.lastName;
        doc.email = updatedPerson.email;
        doc.jobTitle = updatedPerson.jobTitle;
        doc.save(function(err){
            if(!err){
                res.sendStatus(200);
            }
            else{
                res.sendStatus(404);
            }
        });
    });
});

router.get('/deleteUser/:id', checkIfAuthenticated, function(req, res, next) {
    var id = req.params.id;
    Person.update({_id: id}, { isDeleted: true }, function(err){
        if(!err){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(404);
        }
    })
});

router.get('/deleteGroup/:id', checkIfAuthenticated, function(req, res, next) {
    var id = req.params.id;
    Group.update({_id: id}, { isDeleted: true }, function(err){
        if(!err){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(404);
        }
    })
});

router.post('/updateGroup/:id', checkIfAuthenticated, function(req, res, next) {
    var id = req.params.id;
    var updatedGroup = req.body.updatedGroup;
    Group.findOne({ _id: id }, function (err, doc){
        if(err){
        }
        doc.name = updatedGroup.name;
        doc.comment = updatedGroup.comment;
        doc.save(function(err){
            if(!err){
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        });
    });
});


module.exports = router;

