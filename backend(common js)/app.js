const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./routes/AuthRoute.js");
const MessageRoute = require("./routes/MessageRoute.js");
const UserRoute = require("./routes/UserRoute.js");
const dbconnect = require("./db/dbconnect.js");
const path = require("path");
const { fileURLToPath } = require("url");
const { app, io, server } = require("./utils/socket.js");

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
