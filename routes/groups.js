var express = require('express');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var router = express.Router();

function checkIfAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/users/login");
    }
}

//Route: /groups/add Method:GET - Renders the add-person template
router.get('/add', checkIfAuthenticated, function(req, res, next) {
    res.render('groups/add-group', {signedUser: req.user});
});

//Route: /groups/add Method:POST - Puts data from post into database
router.post('/add', checkIfAuthenticated, function(req, res, next) {
    var groupToAdd = new Group({
        name: req.body.name,
        comment: req.body.comment,
        isDeleted: false
    });
    groupToAdd.save(function(err, group) {
        res.render('partials/success', {signedUser: req.user, title: 'Групата е успешно добавена:', info: group.name});
    });
});

router.get('/list', checkIfAuthenticated, function(req, res, next) {
    Group.find().exec(function(err, groups) {
        res.render('groups/groups-list', {signedUser: req.user, groups: groups });
    });
});


module.exports = router;

