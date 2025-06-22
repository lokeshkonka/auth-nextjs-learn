import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on("Connected",()=>{
            console.log("Mongo DB Cnnected Successfully");
            
        })
        connection.on("Error",(err)=>{
            console.log(`Please make sure that mongoDB is Connected ${err}`);
            process.exit()
            
        })
    } catch (error) {
        console.log("Something went wrong in database connection");
        console.log(error);
        
        
    }
    
}



