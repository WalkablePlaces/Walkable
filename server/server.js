
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const apiController = require('./controllers/apiController');



// app.get('/test', (req, res) => {
//     res.sendStatus(200);
// });





app.get('/', apiController.getLocationResults, (req, res) => {
        console.log(res.locals.rawData);
    res.json({places: res.locals.rawData})
   })
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