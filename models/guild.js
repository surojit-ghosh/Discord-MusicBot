const mongoose = require('mongoose');

module.exports = mongoose.model('guild', new mongoose.Schema({
    guildId: { type: String, required: true },
    prefix: { type: String, required: false },
    channelId: { type: String, required: false },
    messageId: { type: String, required: false }
}));