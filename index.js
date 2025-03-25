import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const PORT = 5000;

import { connectToDB } from './database.js';
import userRoute from './routes/user.js';
import adminRoute from './routes/admin.js';
import user from './models/user.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Replace with your frontend's domain for production
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/images', express.static('uploads')); // images uploads are public
app.use('/test', userRoute);
app.use('/test', adminRoute);

io.on('connection', (socket) => {
   // console.log('A user connected');
    console.log(socket.id)

    // Example: Handling an event from the client
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Optionally, emit a response back to the client
        socket.emit('response', { message: 'Message received!' });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on port ${PORT}`);
});