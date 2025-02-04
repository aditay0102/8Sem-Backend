import mongoose from 'mongoose';


const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        status:{
            default: sent
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

        

    }
)