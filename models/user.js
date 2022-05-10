import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    accessToken: { type: String },
    refreshToken: { type: String }
});

export default mongoose.model('user', userSchema);