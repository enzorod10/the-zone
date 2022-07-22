let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: String, required: true },
    author: { type: Object, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);