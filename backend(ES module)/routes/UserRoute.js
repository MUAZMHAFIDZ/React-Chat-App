import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { userSideBar } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", protectRoute, userSideBar);

export default router;
