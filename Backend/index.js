import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";


app.use(cors());
dotenv.config();
app.use(cookieParser());
const port = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URI;

try {
    mongoose.connect(MONGODB_URL)
    console.log("Connected to MongoDb")
} catch (error) {
    console.log(error);
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoute)

server.listen(port, () => {
    console.log(`Example app is listening at Port: ${port}`)
})