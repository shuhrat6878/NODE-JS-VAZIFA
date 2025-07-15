import { connect } from "mongoose";
import { config } from "dotenv";
config();

export const connectDB= async ()=>{
    try {
        await connect(process.env.MONGODB_URL)
        console.log('Databasaga ulandi')
    } catch (error) {
        console.log('Error connect to database')
        process.exit(1);
    }
}