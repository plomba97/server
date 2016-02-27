var _ = require('underscore');

var callManager = (function(){
    var callManager = {};

    Object.defineProperty(callManager, 'init', {
        value: function (options) {
            this.ari = options.ari;
            this.calls = [];
            this.maxCalls = options.maxCalls;
            this.appName = options.appName;
            this.state = 'None';
            return this;
        }
    });

    Object.defineProperty(callManager, 'checkCallState', {
        value: function (endPointToCheck) {
            var item = _.find(this.calls, function(element){return element.endPoint == endPointToCheck});
            if(item){
                return item.state;
            }
            return undefined;
        }
    });

    Object.defineProperty(callManager, 'addCall', {
        value: function (callToAdd) {
            if(!_.contains(this.calls, callToAdd)){
                this.calls.push(callToAdd);
                return true;
            }
            return false;
        }
    });

    Object.defineProperty(callManager, 'getActiveCalls', {
        value: function () {
            var currActiveCalls = _.filter(this.calls, function(element){return (element.state != 'None' && element.state != 'Finished')});
            return currActiveCalls.length;
        }
    });

    Object.defineProperty(callManager, 'startCalls', {
        value: function () {
            var obj = this;

            var priority1 = _.filter(obj.calls, function(element){return (element.priority == 1)});
            var priority2 = _.filter(obj.calls, function(element){return (element.priority == 2)});
            var priority3 = _.filter(obj.calls, function(element){return (element.priority == 3)});
            var priority4 = _.filter(obj.calls, function(element){return (element.priority == 4)});
            var priority5 = _.filter(obj.calls, function(element){return (element.priority == 5)});
            var intervalId = setInterval(function(){
                console.log(obj.getActiveCalls());
                if(obj.getActiveCalls() < obj.maxCalls && priority1[0]){
                    priority1[0].startCall(obj.ari, obj.appName, obj);
                    priority1.shift();
                }
                else if(obj.getActiveCalls() < obj.maxCalls && priority2[0]){
                    priority2[0].startCall(obj.ari, obj.appName, obj);
                    priority2.shift();
                }
                else if(obj.getActiveCalls() < obj.maxCalls && priority3[0]){
                    priority3[0].startCall(obj.ari, obj.appName, obj);
                    priority3.shift();
                }
                else if(obj.getActiveCalls() < obj.maxCalls && priority4[0]){
                    priority4[0].startCall(obj.ari, obj.appName, obj);
                    priority4.shift();
                }
                else if(obj.getActiveCalls() < obj.maxCalls && priority5[0]){
                    priority5[0].startCall(obj.ari, obj.appName, obj);
                    priority5.shift();
                }
                //else if(!(priority1[0] && priority2[0] && priority3[0] && priority4[0] && priority5[0])){
                //    console.log('all emoty')
                //    clearInterval(intervalId);
                //}
            }, 60);
        }
    });

    return callManager;
}());

module.exports = callManager;
