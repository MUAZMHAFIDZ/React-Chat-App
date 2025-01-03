import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/AuthRoute.js";
import MessageRoute from "./routes/MessageRoute.js";
import UserRoute from "./routes/UserRoute.js";
import dbconnect from "./db/dbconnect.js";
import path from "path";
import { fileURLToPath } from "url";
import { app, io, server } from "./utils/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

app.use("/api/auth", AuthRoute);
app.use("/api/message", MessageRoute);
app.use("/api/users", UserRoute);

server.listen(PORT, () => {
  dbconnect();
  console.log(`Server Run in port ${PORT}`);
});
