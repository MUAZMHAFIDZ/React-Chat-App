import Convertion from "../models/convert.js";
import Message from "../models/message.js";

const sendMessage = async (req, res) => {
    try {
        const {message} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

        let convertion = await Convertion.findOne({
            participant: {$all: [senderId, receiverId]}
        })

        if(!convertion) {
            convertion = await Convertion.create({
                participant: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage) {
            convertion.message.push(newMessage._id);
        }

        res.status(201).json(newMessage)

        //socket io for real time chat



        await Promise.all([await convertion.save(), await newMessage.save()])


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
        
        const convertion = await Convertion.findOne({
            participant: {$all: [senderId, receiverId]}
        }).populate("message")

        if(!convertion) {
            return res.status(201).json([])
        }

        const mess = convertion.message

        res.status(200).json(mess)
        
    } catch (error) {
        console.log("receive Message Error : ", error.message)
        res.status(500).json({
            error: "internal server error"
        })
    }
}

export {sendMessage, receiveMessage}