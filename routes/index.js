var express = require('express');
var Person = require('../data-models/person-model.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Test' });
});

module.exports = router;
