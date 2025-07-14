import { config } from "dotenv";
import  { connect} from "mongoose";
config();



export const connectDB = async ()=>{
    try {
        await connect(process.env.MONGO_URI);
        console.log(" databases Connected ---ok")
        
    } catch (error) {
        console.log('ereor on connect to databases', error);
        process.exit(1);
    }
}
