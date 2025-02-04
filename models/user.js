import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type: String,
            default: "0"
        },
        complaint:{
            type: Array,
            
        }
    }
)

export  default mongoose.model("User",userSchema);
