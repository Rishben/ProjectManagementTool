import mongoose from "mongoose";

const teamLeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    teamCode: {
        type: [String],
    },
    isOnline: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model("TeamLead", teamLeadSchema);
