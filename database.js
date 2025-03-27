import mongoose, { mongo } from "mongoose";
import 'dotenv/config'

const uri = String(process.env.mongodb);

function connectToDB(){
    mongoose.connect(uri)
    try{
        console.log(mongodb);
     console.log("database connected");
        

    }
    catch{
        console.log("something is wrong ");
    }
    
}


export {connectToDB};