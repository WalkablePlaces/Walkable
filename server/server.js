
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

const apiController = require('./controllers/apiController');

app.use(bodyParser.json())


app.post('/getLocationResults', apiController.getLocationResults, (req, res) => {
    res.json({places: res.locals.rawData});
   })


   // get current location **testing**
   app.get('/location', apiController.getCurrentLocation, (req, res) => {
      res.json(res.locals.currentLocation);
    });



   // What do you want
   // Where are you?

   // what you want - rough idea of where you are


   // scrap walking idea
    // limit search results 




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




app.listen(PORT, () => console.log('listing on 3000'));