import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/DB.js";
import FetchID from "./routes/FetchID.js";
import JoinProject from "./routes/JoinProject.js";
import Project from "./routes/Project.js";
import TeamLead from "./routes/TeamLead.js";
import TeamMember from "./routes/TeamMember.js";
import User from "./routes/User.js";

import {Server} from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"], credentials: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for testing (adjust in prod)
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (roomID) => {
    socket.join(roomID);
    console.log(`User ${socket.id} joined room: ${roomID}`);
  });

  socket.on("send_message", ({ roomID, message }) => {
    socket.to(roomID).emit("receive_message", {
      text: message,
      sender: "them",
      timestamp: new Date(),
    });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(cookieParser());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/teamLeader", TeamLead);
app.use("/teamMember", TeamMember);
app.use("/joinProject", JoinProject);
app.use("/projects", Project);
app.use("/users", User);
app.use("/ID", FetchID);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});