import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ajDecision } from './middleware/arcjetMiddleware.js'; 
import { db } from './config/neondb.js';

const app = express();
app.set('trust proxy', true);

const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

const allowedOrigins = isProd
  ? process.env.FRONTEND_URLS?.split(',').map(o => o.trim())
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (!isProd || allowedOrigins?.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(morgan(isProd ? 'combined' : 'dev'));
app.use(helmet());

if (isProd) {
  app.use(ajDecision);
}

app.use(express.json());
app.use(cookieParser())
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

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found on api.brookrent.com" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: isProd ? "Internal Server Error" : err.message });
});

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