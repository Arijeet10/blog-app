import mongoose from "mongoose";

export const connectMongoDB=async()=>{
    //check if database is already connected
    if(mongoose.connections[0].readyState){
        return;
    }
    //try connecting to database
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");        
    } catch (error) {
        console.log("Error in connecting to MongoDB");
    }
}