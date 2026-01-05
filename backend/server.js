const express =  require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express();
const port = 3000;
const { db } = require('./config/neondb');

app.use(cors())
app.use(morgan('dev'))
app.use(helmet());
app.use(express.json());

app.get("/", (req,res) => {
    console.log("API is running");
    res.json({
        message: "API is running",
        timestamp: new Date().toISOString()
    });
});

const listerRouter = require('./routes/renter');
const renterRouter = require('./routes/lister');
const signupRouter = require('./routes/signup');

app.use('/lister', listerRouter);
app.use('/renter', renterRouter);
app.use('/signup', signupRouter);

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