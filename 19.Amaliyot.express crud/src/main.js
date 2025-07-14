import express from "express";
import { config } from "dotenv";
import univerRouter from "./routes/universitet.routes.js"
import { connectDB } from "./db/index.js";
import guruhRouter from "./routes/guruh.routes.js"
import studentRouter from "./routes/student.routes.js"

config();


const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
await connectDB();

app.use('/universitet', univerRouter);
app.use('/guruh',guruhRouter);
app.use('/student',studentRouter);




app.listen(PORT, ()=>{
    console.log(`server shu port ishga tushdi`,PORT)
});


