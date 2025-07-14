import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import createRouter from "./routes/country.route.js"
config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;


app.use(express.json());
await connectDB();

app.use('/country',createRouter);


app.listen(PORT, ()=>{
    console.log("server  shu portta ishga tushdi->",PORT)
});