import express from "express"
import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import categoryRouter from "./routes/category.route.js"
import praductRouter from "./routes/praduct.route.js"
import izohlarRouter from "./routes/review.route.js"
config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
await connectDB();


app.use('/category', categoryRouter);
app.use('/praduct', praductRouter);
app.use('/izohlar', izohlarRouter);



app.listen(PORT,()=>{
    console.log("server ishga tushdi shu portta:",PORT);
    
})
