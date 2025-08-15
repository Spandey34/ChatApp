import {Server} from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
dotenv.config();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3001"
];

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://chat-app-frontend-zeta-two.vercel.app");
  res.status(err.status || 500).json({ message: err.message });
});


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for: " + origin));
    }
  },
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET","POST"],
    }
});

//Realtime message code goes here

export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}


const users ={};

//used to listen events from server side.
//connection and disconnect are reserved words do not use anything in their place
io.on("connection", (socket) => {
    console.log("A new user is connected!", socket.id);
    const userID = socket.handshake.query.userId;

    if(userID)
    {
       users[userID] = socket.id;
       //console.log("Hello ",users);
    }

    //used to send the events to all connected users
    io.emit("getOnlineUsers", Object.keys(users));
    //used to listen client side events emitted by server side (server & client)
    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        delete users[userID];
        io.emit("getOnlineUsers", Object.keys(users));
    })
});

export{ app,io,server}