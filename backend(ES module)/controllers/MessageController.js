import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { getReceiverSocketId, io } from "../utils/socket.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("Message:", message);
    console.log("File:", req.file);
    if (!message && !req.file) {
      return res.status(400).json({ error: "Message or image is required." });
    }

    let conversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participant: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image: req.file ? `/public/uploads/${req.file.filename}` : null,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("send Message Error : ", error.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

const receiveMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    }).populate("message");

    if (!conversation) {
      return res.status(201).json([]);
    }

    const message = conversation.message;

    res.status(200).json(message);
  } catch (error) {
    console.log("receive Message Error : ", error.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export { sendMessage, receiveMessage };
