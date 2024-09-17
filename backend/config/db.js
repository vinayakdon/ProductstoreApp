import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`mongodb connected: ${conn.connection.host}`)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}