import {connect} from "mongoose";
import { config } from "dotenv";
config();

export const connectDb = async()=>{
    try {
        await connect(process.env.MONGO_URI);
        console.log("databasza ulandik")
    } catch (error) {
        console.log("erorr databases",error);
        process.exit(1);
    }
}