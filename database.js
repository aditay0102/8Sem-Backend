import mongoose from "mongoose"; 
import dotenv from "dotenv"; 

dotenv.config(); // Load environment variables from .env file

const uri = process.env.mongoDB; // Use a clear and meaningful environment variable name

async function connectToDB() {
  if (!uri) {
    console.error("Database URI is not defined. Please check your .env file.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    // Additional error handling logic (e.g., exit process in critical environments)
  }
}

export { connectToDB };