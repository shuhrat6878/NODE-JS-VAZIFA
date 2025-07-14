import { config } from "dotenv";
import { connect } from "mongoose";
config();


export const connectDB = async ()=>{
    try {
        await connect(process.env.MONGODB_URI);
        console.log("databasaga ulandi ok ");
        
    } catch (error) {
        console.log('condect databases error', error);
        process.exit(1);
    }
}