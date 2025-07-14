import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import router from "./routes/country.route.js";
import routerCity from "./routes/city.route.js";
config();


const PORT=Number(process.env.PORT) || 3000;

const app=express();
app.use(express.json());
app.use("/country",router);
app.use("/city",routerCity);
await connectDB();

app.listen(PORT,()=>console.log('Server run in port... ',PORT))


