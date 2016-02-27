'use strict';

var ari = require('ari-client');

var cache = {};

function getClient(config, stasisAppName) {
    return new Promise(function (resolve, reject) {
        if(Object.keys(cache).length !== 0){
            resolve(cache);
        }
        else{
            ari.connect(config.url, config.username, config.password)
                .then(function(client){
                    cache = client;
                    client.start(stasisAppName);

                    resolve(client);
                })
                .catch(function(err){
                    reject(err);
                });
        }
    });
}

function clearCache() {
    cache = {};
}

module.exports = {
    getClient: getClient,
    clearCache: clearCache
};
