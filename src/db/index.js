import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

export const dbConnect = async ()=> {
    try {
        const connectionString = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    
        console.log("DB connected: ", connectionString.connection.host);
    } catch (error) {
        console.log("Error in DB CONNECT", error)
        throw error;
    }   
    
}