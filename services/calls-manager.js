var _ = require('underscore');

var managers = {};

function CallManager(options){
    this.ari = options.ari;
    this.calls = [];
    this.maxCalls = options.maxCalls;
    this.appName = options.appName;
    this.state = 'None';
}

var createManager = function (options) {
    if(Object.keys(managers).length !== 0){
        return managers;
    }
    else{
        managers = new CallManager(options);
        return managers;
    }
};

CallManager.prototype.addCall = function (callToAdd) {
        if(!_.findWhere(this.calls, {'endPoint':callToAdd.endPoint})){
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
        var priority1 = _.filter(obj.calls, function(element){return (element.priority == 1)});
        var priority2 = _.filter(obj.calls, function(element){return (element.priority == 2)});
        var priority3 = _.filter(obj.calls, function(element){return (element.priority == 3)});
        var priority4 = _.filter(obj.calls, function(element){return (element.priority == 4)});
        var priority5 = _.filter(obj.calls, function(element){return (element.priority == 5)});
        var intervalId = setInterval(function(){
            console.log(obj.getActiveCalls());
            if(obj.getActiveCalls() < obj.maxCalls && priority1[0]){
                priority1[0].startCall(obj.ari, obj.appName)
                    .then(function(state){
                        console.log(state);
                    })
                    .catch(function(err){

                    });
                priority1.shift();
            }
            else if(obj.getActiveCalls() < obj.maxCalls && priority2[0]){
                priority2[0].startCall(obj.ari, obj.appName)
                    .then(function(state){
                        console.log(state);
                    })
                    .catch(function(err){

                    });
                priority2.shift();
            }
            else if(obj.getActiveCalls() < obj.maxCalls && priority3[0]){
                priority3[0].startCall(obj.ari, obj.appName)
                    .then(function(state){
                        console.log(state);
                    })
                    .catch(function(err){

                    });
                priority3.shift();
            }
            else if(obj.getActiveCalls() < obj.maxCalls && priority4[0]){
                priority4[0].startCall(obj.ari, obj.appName)
                    .then(function(state){
                        console.log(state);
                    })
                    .catch(function(err){

                    });
                priority4.shift();
            }
            else if(obj.getActiveCalls() < obj.maxCalls && priority5[0]){
                priority5[0].startCall(obj.ari, obj.appName)
                    .then(function(state){
                        console.log(state);
                    })
                    .catch(function(err){

                    });
                priority5.shift();
            }
            else if(!(priority1[0] && priority2[0] && priority3[0] && priority4[0] && priority5[0])){
                console.log('all empty');
                clearInterval(intervalId);
            }
        }, 60);
};

module.exports = {
    createManager: createManager
};
