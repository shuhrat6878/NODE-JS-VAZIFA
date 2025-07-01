import express from "express"
import { read, write} from "./write-red.js";


const app  = express();

app.use(express.json());

app.post ('/', async (req, res))



app.listen(3000, () => {
    console.log("server runing 3000 port")
})

