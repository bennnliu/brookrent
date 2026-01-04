const express =  require('express');
const app = express();
const port = 3000;

app.get("/", (res) => {
    console.log("Sending API message");

    res.status(200).json({
        message: "API is running",
        timestamp: new Date().toISOString()
    });
});

const listerRouter = require('./routes/lister');
const renterRouter = require('./routes/renter');
const signupRouter = require('./routes/signup');

app.use('/lister', listerRouter);
app.use('/renter', renterRouter);
app.use('./signup', signupRouter);

app.listen(port, () => {
    console.log("Succesfully connected to port: " + port)
})