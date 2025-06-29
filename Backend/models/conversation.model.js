import mongoose from "mongoose";
import User from "./user.model.js";
import Message from "./message.model.js";

const conversationSchema = mongoose.Schema({
      members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
      ],
      messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",
            default: []
        }
      ]
})

const Conversation = mongoose.model("conversation", conversationSchema);

export default Conversation;