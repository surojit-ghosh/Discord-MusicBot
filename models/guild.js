import mongoose from "mongoose";

const guildSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    prefix: { type: String, required: false },
    musicPannel: {
        type: {
            channelId: { type: String, required: false },
            messageId: { type: String, required: false }
        }
    }
});

export default mongoose.model('guild', guildSchema);