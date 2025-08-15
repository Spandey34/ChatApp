import {Server} from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv"

const app = express();

dotenv.config();
const allowedOrigins = process.env.FRONTEND_URL || "http://localhost:3001";

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