import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      message: {
        type: String,
        required: true
      }
},{timestamps: true});

const Message = mongoose.model("message", messageSchema);

export default Message