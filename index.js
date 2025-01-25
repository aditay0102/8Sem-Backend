import express from 'express';
import cors from 'cors';
const PORT = 5000;

import {connectToDB} from './database.js';
import userRoute from './routes/user.js';
import user from './models/user.js';

import bodyParser from 'body-parser';



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/test',userRoute);

app.listen(PORT,() => {
    connectToDB();
    console.log(`Server is running onn port ${PORT}`)
    
})

