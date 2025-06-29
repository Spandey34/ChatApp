import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"

export const sendMessage = async (req,res) => {
   try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const message = req.body.message;
    
    let conversation = await Conversation.findOne({
        members: {$all: [senderId, receiverId]}
    });

    if(!conversation)
    {
        conversation = await Conversation.create({
            members: [senderId,receiverId],
        })
    }

    const newMessage = await Message.create({
        senderId,receiverId,message
    })

    if(newMessage)
    {
        conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]);//runs parallely to save both messages and conversation

    res.status(201).json({message: "Message sent Successfull", conversationId: conversation._id, newMessage})

   } catch (error) {
     console.log(error);
     res.status(500).json({message: "Problem in sending Message", error});
   }
}

export const getMessage = async (req,res) => {
    try {
    const senderId = req.user._id;
    const chatUser = req.params.id;
    
    let conversation = await Conversation.findOne({
        members: {$all: [senderId, chatUser]}
    }).populate("messages");//Populate karne se messages m jo ids h uska use krke wo actual message messageModel se nikal ke laayega

    if(!conversation)
    {
        return res.status(201).json([]);
    }

    const messages = conversation.messages;

    res.status(201).json(messages);

   } catch (error) {
     console.log(error);
     res.status(500).json({message: "Problem in getting Message", error});
   }
}