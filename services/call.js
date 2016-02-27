function Call(options){
    this.endPoint = options.endPoint;
    this.priority = options.priority;
    this.attempts = options.attempts;
    this.state = 'None';
}

Call.prototype.startCall = function (ari, appName) {
    this.state = 'Waiting';
    var obj = this;
    console.log('Waiting', this.priority);
    console.log(ari);
    ari.channels.originate({endpoint: this.endPoint, app: appName, appArgs: 'dealed'})
        .then(function(channel){
            obj.state = 'Dialing';
            console.log('--call.js--channel successfuly originated:', channel.id);
            channel.on('ChannelStateChange', function(event, channel1){
                console.log('--call.js--channel state:',event.channel.state);
                if(event.channel.state == 'Up'){
                    obj.state = 'Answered';
                    //console.log('--call.js--channel playing sound', channel1.id);
                    var playback = ari.Playback();
                    channel.play({media: 'sound:demo-congrats'}, playback)
                        .then(function(playback){
                            obj.state='Playing';
                        })
                        .catch(function(err){
                        });
                }
            });
            channel.on('ChannelDestroyed', function(event, channel1){
                obj.state = 'Finished';
                console.log('--call.js--channel destroyed:', channel1.id);
            });
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
        });
};

function makeCall(options){
    return new Call(options);
}

module.exports = {
    makeCall: makeCall
};
