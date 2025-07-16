import {connect} from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB ga ulandi");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
