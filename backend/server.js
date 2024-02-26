import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoute from "./route/Authroute.js";
import MessageRoute from "./route/Messageroute.js";
import UserRoute from "./route/Userroute.js";
import dbconnect from "./db/dbconnect.js";

const app = express();

dotenv.config()
const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send("hello Muaz")
// })

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))
app.use('/api/auth', AuthRoute)
app.use('/api/message', MessageRoute)
app.use('/api/users', UserRoute)

app.listen(PORT, () => {
    dbconnect()
    console.log(`Server Run in port ${PORT}`)
})