var express = require('express');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var router = express.Router();

//Route: /people/ Method:GET - Renders user-list template
router.get('/', function(req, res, next) {
    Person.find().populate('groups').exec(function(err, data) {
        Group.find().exec(function(err, groups) {
            res.render('user-list', { people: data, groups: groups });
        });
    });
});

//Route: /people/ Method:POST - Gets data about people to add in group
router.post('/', function(req, res, next) {
    console.log(req.body);
    var groupId = req.body.group;
    var userIds = req.body.ids;

    Group.update({_id: groupId}, {$addToSet: { people: { $each: userIds } }}, function(err, data){
        if(err){
            console.log(err);
        }
        console.log(data);
        console.log(data);
        //res.redirect('/people');
    });

    Person.update({_id : {"$in":userIds}}, {$addToSet: { groups: groupId }}, {multi: true} , function(err,data) {
        if(err){
            console.log(err);
        }
        console.log(data);
        res.sendStatus(200)
    });
});

//Route: /people/add/person Method:GET - Renders the add-person template
router.get('/add', function(req, res, next) {
    res.render('add-person', {});
});

//Route: /people/add/person Method:POST - Receives post request with the data and adds it to db
router.post('/add', function(req, res, next) {
    var personToAdd = new Person({
        title: req.body.title,
        firstName: req.body.fName,
        secondName: req.body.sName,
        lastName: req.body.lName,
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        groups: []
        });
    personToAdd.phones.push({number: req.body.phone1, priority: 1, attempts: req.body.phone1try});
    personToAdd.phones.push({number: req.body.phone2, priority: 2, attempts: req.body.phone2try});
    personToAdd.phones.push({number: req.body.phone3, priority: 3, attempts: req.body.phone3try});
    personToAdd.phones.push({number: req.body.phone4, priority: 4, attempts: req.body.phone4try});
    personToAdd.phones.push({number: req.body.phone5, priority: 5, attempts: req.body.phone5try});

    personToAdd.validate(function(err){
        console.log(err);
        if(err){
            res.render('fail', {title: 'Грешка при записване: ', errors: err.errors});
        }
        else {
            personToAdd.save(function(err, data) {
                res.render('success', {title: 'Контактът е успешно добавен:', info: data.firstName + ' ' + data.lastName});
            });
        }
    });

});



module.exports = router;