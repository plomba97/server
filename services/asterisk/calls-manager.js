var _ = require('underscore');
var callsLogger = require('../calls-logger.js');


var managers = {};

function CallManager(options){
    this.name = options.name;
    this.timeStarted = 'NotStarted';
    this.ari = options.ari;
    this.calls = [];
    this.maxCalls = options.maxCalls;
    this.appName = options.appName;
    this.state = 'None';
    this.activeCalls = 0;
    this.recording = options.recording;
}

var createManager = function (options) {
    managers = new CallManager(options);
    return managers;
};

var getManager = function () {
    return managers;
};

CallManager.prototype.addCall = function (callToAdd) {

    if(true){
        this.calls.push(callToAdd);
        return true;
    }
    return false;
};

CallManager.prototype.getActiveCalls = function () {
    var currActiveCalls = _.filter(this.calls, function(element){return (element.state != 'None' && (element.state != 'FinishedAnswered' && element.state != 'FinishedUnAnswered'))});
    return currActiveCalls.length;
};

CallManager.prototype.startCalls = function () {
    var obj = this;
    if(this.calls[0]){
        var grouped = _.groupBy(obj.calls, 'priority');
        var areEmpty = false;
        console.log(grouped[1]);
        function start(){
            //console.log(obj.getActiveCalls());
            if(obj.activeCalls < obj.maxCalls){
                if(grouped[1] && grouped[1][0]){      //Priority 1
                    grouped[1][0].startCall(obj.ari, obj.appName, obj.recording)
                        .then(function(state){
                            console.log(state);
                            obj.activeCalls--;
                        })
                        .catch(function(err){
                            console.log('Error');
                            obj.activeCalls--;
                        });
                    grouped[1].shift();
                    obj.activeCalls++;
                }
                else if(grouped[2] && grouped[2][0]){   //Priority 2
                    grouped[2][0].startCall(obj.ari, obj.appName, obj.recording)
                        .then(function(state){
                            console.log(state);
                            obj.activeCalls--;
                        })
                        .catch(function(err){
                            console.log('Error');
                            obj.activeCalls--;
                        });
                    grouped[2].shift();
                    obj.activeCalls++;
                }
                else if(grouped[3] && grouped[3][0]){   //Priority 3
                    grouped[3][0].startCall(obj.ari, obj.appName, obj.recording)
                        .then(function(state){
                            console.log(state);
                            obj.activeCalls--;
                        })
                        .catch(function(err){
                            console.log('Error');
                            obj.activeCalls--;
                        });
                    grouped[3].shift();
                    obj.activeCalls++;
                }
                else if(grouped[4] && grouped[4][0]){   //Priority 4
                    grouped[4][0].startCall(obj.ari, obj.appName, obj.recording)
                        .then(function(state){
                            console.log(state);
                            obj.activeCalls--;
                        })
                        .catch(function(err){
                            console.log('Error');
                            obj.activeCalls--;
                        });
                    grouped[4].shift();
                    obj.activeCalls++;
                }
                else if(grouped[5] && grouped[5][0]){   //Priority 5
                    grouped[5][0].startCall(obj.ari, obj.appName, obj.recording)
                        .then(function(state){
                            console.log(state);
                            obj.activeCalls--;
                        })
                        .catch(function(err){
                            console.log('Error');
                            obj.activeCalls--;
                        });
                    grouped[5].shift();
                    obj.activeCalls++;
                }
                else if(obj.activeCalls == 0){
                    areEmpty = true;
                    finalizeManager(obj);
                }
            }
            if(!areEmpty){
                setTimeout(start, 300);
            }
        }
        start();
    }
};
function finalizeManager(obj){
    callsLogger.log(obj);
}

module.exports = {
    createManager: createManager,
    getManager: getManager
};
