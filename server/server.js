
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//routers
const apiRouter = require('./routes/apiRouter');
const loginRouter = require('./routes/loginRouter')

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser())

const key = process.env.GOOGLE_API_KEY;

app.get('/', (req, res) => {
  res.status(200).json({hello: 'goodbye'});
});

app.use('/api', loginRouter, apiRouter);



// returns a list of nearby resturant names, addresses, and distances





// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => console.log('listening on 3000'));