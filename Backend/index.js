import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"
import { app, server } from "./SocketIO/server.js";
import uploadRoutes from "./routes/upload.route.js"
import cors from "cors";


dotenv.config();
const port = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URI;

try {
    mongoose.connect(MONGODB_URL)
    console.log("Connected to MongoDb")
} catch (error) {
    console.log(error);
}

const allowedOrigins = [
  process.env.FRONTEND_URL
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoute);
app.use("/api/upload", uploadRoutes);

server.listen(port, () => {
    console.log(`Example app is listening at Port: ${port}`)
})