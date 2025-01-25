import mongoose, { mongo } from "mongoose";
import 'dotenv/config'

const mongodb = process.env.mongodb;

function connectToDB(){
    mongoose.connect(mongodb)
    try{
     console.log("database connected");
        

    }
    catch{
        console.log("something is wrong ");
    }
    
}


export {connectToDB};