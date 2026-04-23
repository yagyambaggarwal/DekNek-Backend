if (process.env.NODE_ENV !== "production") {
    import("dotenv").then(dotenv => dotenv.config());
}
import mongoose from "mongoose"
// import { DB_NAME } from "../constants.js"

export const dbConnect = async ()=> {
    try {
        const connectionString = await mongoose.connect(`${process.env.MONGODB_URI}`)
    
        console.log("DB connected: ", connectionString.connection.host);
    } catch (error) {
        console.log("Error in DB CONNECT", error)
        throw error;
    }   
    
}