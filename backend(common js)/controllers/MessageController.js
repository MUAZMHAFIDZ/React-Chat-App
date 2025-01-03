const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { getReceiverSocketId, io } = require("../utils/socket");
const fs = require("fs");
const path = require("path");

const __filename = __filename || path.resolve(__dirname, "..");
const __dirname = path.dirname(__filename);

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

const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }

    if (message.senderId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You can only delete your own messages." });
    }

    if (message.image) {
      const imagePath = path.join(__dirname, "..", message.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image file:", err);
        }
      });
    }

    await Message.findByIdAndDelete(messageId);

    await Conversation.updateOne(
      { message: messageId },
      { $pull: { message: messageId } }
    );

    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("deleteMessage", { messageId });
    }

    res.status(200).json({ message: "Message deleted successfully." });
  } catch (error) {
    console.log("delete Message Error : ", error.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

module.exports = {
  sendMessage,
  receiveMessage,
  deleteMessage,
};
