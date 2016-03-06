var recording = require('../data-models/recording-model.js');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testPeople');

var recording1 = new recording({
    name: 'Hello World',
    comment: 'Just an example hello world recording.',
    path: '/var/lib/asterisk/sounds/en/hello-world.ulaw'
});
recording1.save();

var recording2 = new recording({
    name: 'Congrats',
    comment: 'Just an example congrats recording.',
    path: '/var/lib/asterisk/sounds/en/demo-congrats.ulaw'
});
recording2.save();

var recording3 = new recording({
    name: 'Thanks',
    comment: 'Just an example thanks recording.',
    path: '/var/lib/asterisk/sounds/en/demo-thanks.ulaw'
});
recording3.save();
