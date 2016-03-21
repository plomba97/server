var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var groupSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        comment: {type: String, required: true},
        people: [{ type: Schema.Types.ObjectId, ref: 'Person', index: { unique: true } }],
        isDeleted: {type: Boolean, required: true}
    }
);

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
