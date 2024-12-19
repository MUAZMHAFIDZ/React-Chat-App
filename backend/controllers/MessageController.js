import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participant: { $all: [senderId, receiverId] }
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participant: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage) {
            conversation.message.push(newMessage._id);
        }


        //socket io for real time chat

        await Promise.all([ conversation.save(), newMessage.save()])

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("send Message Error : ", error.message)
        res.status(500).json({
            error: "internal server error"
        })
    }
}

const receiveMessage = async (req, res) => {
    try {
        
        const {id:userToChatId} = req.params
        const senderId = req.user._id
        
        const Conversation = await Conversation.findOne({
            participant: {$all: [senderId, receiverId]}
        }).populate("message")

        if(!Conversation) {
            return res.status(201).json([])
        }

        const mess = Conversation.message

        res.status(200).json(mess)
        
    } catch (error) {
        console.log("receive Message Error : ", error.message)
        res.status(500).json({
            error: "internal server error"
        })
    }
}

export {sendMessage, receiveMessage}