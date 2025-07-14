import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import routeUniver from './routes/univer.route.js'
import routeGuruh from './routes/guruh.route.js'
import routerStudent from "./routes/student.route.js"
config();


const PORT=Number(process.env.PORT) || 3000;

const app=express();
await connectDB();
app.use(express.json());
app.use("/univer",routeUniver);
app.use('/guruh',routeGuruh);
app.use("/student",routerStudent)

app.listen(PORT,()=>console.log('Server run in port... ',PORT))


