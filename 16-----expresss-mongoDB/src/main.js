import express from "express";
import { connectedDb } from "./db/index.js"
import userRouter  from "./routes/user.route.js"
import { config } from "dotenv";
config();


const app = express();
const  PORT= Number(process.env.PORT) || 3000;

await connectedDb();

app.use(express.json());
app.use('/users',userRouter);



app.listen(PORT,()=>console.log("server iwga tushdi runing -port: ",PORT));