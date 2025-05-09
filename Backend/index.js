import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import connectDB from './config/DB.js';
import JoinProject from './routes/JoinProject.js';
import Project from './routes/Project.js';
import TeamLead from './routes/TeamLead.js';
import TeamMember from './routes/TeamMember.js';
import { Server } from 'socket.io';

const app=express();
const server=createServer(app);
const io = new Server(server);

app.use(cookieParser());

dotenv.config();

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

app.use("/teamLeader",TeamLead)
app.use("/teamMember",TeamMember)
app.use("/joinProject",JoinProject)
app.use("/projects",Project)


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});