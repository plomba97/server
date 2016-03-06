var CallsLog = require('../data-models/calls-data-model.js');

var logCall = function(managerToLog){
    var managerToAdd = new CallsLog({
        name: managerToLog.name,
        dateStarted: new Date(),
        calls: managerToLog.calls
    });

    managerToAdd.save();
};

module.exports ={
    log: logCall
};