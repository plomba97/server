function Call(options){
    this.endPoint = options.endPoint;
    this.priority = options.priority;
    this.attempts = options.attempts;
    this.state = 'None';
}

Call.prototype.startCall = function (ari, appName) {
    var obj = this;
    var promise = new Promise(function(resolve, reject){
        obj.state = 'Waiting';
        var isAnswered = false;
        ari.channels.originate({endpoint: obj.endPoint, app: appName, appArgs: 'dealed'})
            .then(function(channel){
                //console.log('--call.js--channel successfully originated:', channel.id);
                console.log('originated');

                channel.on('ChannelStateChange', onStateChange);

                channel.on('ChannelDestroyed', onDestroyed);

                function onStateChange(event, channel){
                    //console.log('--call.js--channel state:',event.channel.state);
                    if(event.channel.state == 'Ringing'){
                        obj.state = 'Dialing';
                    }
                    else if(event.channel.state == 'Up'){
                        //console.log('--call.js--channel playing sound', channel.id);
                        obj.state = 'Answered';
                        isAnswered = true;
                        playBack(channel); //TODO: implement custom recordings
                    }
                }

                function onDestroyed(event, channel){
                    //console.log('--call.js--channel destroyed:', channel.id);
                    if(isAnswered){
                        obj.state = 'FinishedAnswered';
                    }
                    else{
                        obj.state = 'FinishedUnAnswered';
                    }
                    resolve(obj.state);
                }

                function playBack(channel, recording){
                    var playback = ari.Playback();
                    //channel.play({media: 'sound:demo-congrats'}, playback)
                        .then(function(playback){
                            obj.state='Playing';
                        })
                        .catch(function(err){
                            reject(err);
                        });
                }
                //var count=0;
                //var keysEntered=[];
                //channel.on('ChannelDtmfReceived', function(event, channel1) {
                //    console.log('--call.js--channel dtmf received:', event.digit,' ', channel1.id);
                //    keysEntered.push(event.digit);
                //    count++;
                //    if(count==4){
                //        console.log('the entered code is:', keysEntered);
                //        count=0;
                //        keysEntered=[];
                //    }
                //});
            })
            .catch(function(err){
                console.log('--call.js--could not originate channel', err);
                reject(err);
            });
    });

    return promise;
};

function makeCall(options){
    return new Call(options);
}

module.exports = {
    makeCall: makeCall
};
