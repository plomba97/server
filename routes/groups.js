var express = require('express');
var Person = require('../data-models/person-model.js');
var Group = require('../data-models/group-model.js');
var router = express.Router();

//Route: /groups/add Method:GET - Renders the add-person template
router.get('/add', function(req, res, next) {
    res.render('add-group', {});
});

//Route: /groups/add Method:POST - Puts data from post into database
router.post('/add', function(req, res, next) {
    console.log(req.body);
    var groupToAdd = new Group({
        name: req.body.name,
        comment: req.body.comment
    });
    groupToAdd.save(function(err, group) {
        res.render('success', {title: 'Групата е успешно добавена:', info: group.name});
    });
});

module.exports = router;

