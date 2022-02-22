import mongoose from "mongoose";

const guildModel = mongoose.model('guild', new mongoose.Schema({
    guildId: { type: String, required: true },
    prefix: { type: String, required: false },
    channelId: { type: String, required: false },
    messageId: { type: String, required: false }
}));

export default guildModel;