var client = require('ari-client');
var call = require('./asterisk/call.js');
var callManager = require('./asterisk/calls-manager.js');


client.connect('http://127.0.0.1:8088', 'plomba97', 'plomba97')
    .then(function(ari){
        ari.start('originate-test');
        console.log('app created');

        var manager = callManager.createManager({ari:ari, maxCalls: 10, appName: 'originate-test'});
        console.log(ari);
        for(var i=0;i<50;i++){
            call = Object.create(call).init({endPoint:'SIP/asterisk2/10' + i, priority: (Math.floor(Math.random()*6)), attempts: 1});
            manager.addCall(call);
        }

        console.log(manager.startCalls());
        console.log('end');
    })
    .catch(function(err){
        console.log(err);
    });

