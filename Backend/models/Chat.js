import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
    },
    user1ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"",
        required:true,
    },
    user2ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"",
        required:true,
    }
});

export default mongoose.model("Chat", chatSchema);