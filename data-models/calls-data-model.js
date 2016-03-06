var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var callLogsSchema = new mongoose.Schema(
    {
        name: String,
        dateStarted: Date,
        calls: []
    }
);

var callLog = mongoose.model('CallLog', callLogsSchema);

module.exports = callLog;