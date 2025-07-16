import express from "express";
import {config} from "dotenv";
import { connectDB } from "./db/index.js";
import bookRoutes from "./routes/book.routes.js";
import authorRoutes from "./routes/author.routes.js";
import orderRoutes from "./routes/order.routes.js";
import analizRoutes from './routes/analiz.routes.js';

config();
connectDB();

const app = express();
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/orders", orderRoutes);
app.use('/analiz',analizRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
