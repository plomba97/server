var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var recordingSchema = new mongoose.Schema(
    {
        name: String,
        comment: String,
        path: String
    }
);

var recording = mongoose.model('Recording', recordingSchema);

module.exports = recording;