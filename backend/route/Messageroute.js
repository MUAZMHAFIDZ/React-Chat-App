import express from "express";
import { sendMessage, receiveMessage } from "../controller/Messagecontroller.js";
import protectRoute from "./middleware/protectRoute.js";

const router = express.Router()

router.get('/:id', protectRoute, receiveMessage)
router.post('/send/:id', protectRoute, sendMessage)

export default router