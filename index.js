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


import Message from './models/message.js';

const app = express();
const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
    
    cors: {
        origin:  ['https://8-sem-frontend.vercel.app/', 'http://localhost:3000','https://eightsem-backend.onrender.com'] ,  // Replace with your frontend's domain for production
    }
});




app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/images', express.static('uploads')); // images uploads are public

app.get('/', (req, res) => {
    res.send('working');
});
app.use('/test', userRoute);
app.use('/test', adminRoute);

// Socket.io connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);


    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`User with ID ${socket.id} joined room: ${roomId}`);

        // Fetch old messages for the room from the database
        Message.find({ room: roomId })
            .then((messages) => {
                // Emit old messages to the client who joined
                socket.emit("previous_messages", messages);
            })
            .catch((err) => console.error(err));
    });


    socket.on("send_message", (messageData) => {
        console.log(`Message received in room ${messageData.room}:`, messageData);

        // Save the message to the database
        const newMessage = new Message(messageData);
        newMessage.save()
            .then(() => console.log('Message saved to database'))
            .catch((err) => console.error(err));

        // Broadcast the message to other users in the room
        socket.to(messageData.room).emit("receive_message", messageData);
    });


    


    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on port ${PORT}`);
});