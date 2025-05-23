import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/DB.js';
// import cookieParser from 'cookie-parser';

import cookieParser from 'cookie-parser';
import TeamLead from './routes/TeamLead.js';
import TeamMember from './routes/TeamMember.js';
import JoinProject from './routes/JoinProject.js';

const app=express();

app.use(cookieParser());

dotenv.config();

connectDB();

app.use(cors({
    origin: 'https://projectmanagementtool-fe.onrender.com',
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use("/teamLeader",TeamLead)
app.use("/teamMember",TeamMember)
app.use("/joinProject",JoinProject)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
