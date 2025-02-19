import mongoose from 'mongoose';


const complaintSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
        },
        userEmail:{
            type: String,
        },
        userId:{
            type: String,
        },
        title:{
            type: String,
            
        },
        description:{
            type: String,
           
        },
        img:{
            type:String,
        },
        status:{
            type: String,
            default: "send"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

        

    }
)

export default mongoose.model("Complaint",complaintSchema);