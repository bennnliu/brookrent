import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { ajDecision } from './middleware/arcjetMiddleware.js'; 
import { db } from './config/neondb.js';

const app = express();
const port = 3000;

app.use(cors())
app.use(morgan('dev'))
app.use(helmet());
app.use(ajDecision);
app.use(express.json());
app.get("/api", (req,res) => {
    res.json({
        message: "API is running",
        timestamp: new Date().toISOString()
    });
});


import listerRouter from './routes/listerRoutes.js';
import renterRouter from './routes/renterRoutes.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';

app.use('/api/lister', listerRouter);
app.use('/api/renter', renterRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

const startServer = async () => {
  try{
      await db()
      app.listen(port, ()=> {
      console.log("Succesfully connected to port: " + port)
    })
  }
    catch(e){
    console.log(e)
    process.exit(1)
  }
}

startServer();