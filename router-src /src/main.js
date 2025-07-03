import exspress from 'express';
import userRouter from './routes/user.route.js'

const app = exspress();

app.use(exspress.json());
app.use('/user', userRouter);




app.listen(3000, ()=> console.log("server 3000 porta ishladdi"))