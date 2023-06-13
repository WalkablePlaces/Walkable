
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const googleMaps = require('@googlemaps/google-maps-services-js');
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

app.use(cors());
const apiController = require('./controllers/apiController');
const favoriteController = require('./controllers/favoriteController');
app.use(bodyParser.json())

const key = process.env.GOOGLE_API_KEY;

app.get('/', (req, res) => {
  res.status(200).json({hello: 'goodbye'});
});


// returns a list of nearby resturant names, addresses, and distances
app.post('/getLocationResults', apiController.addressToLocation, apiController.getLocationResults, apiController.walkingDistance, favoriteController.checkDatabase, (req, res) => {
  console.log(res.locals.rawData);
    res.status(200).json({places: res.locals.rawData});
   })


   app.post('/addFavorite', favoriteController.addFavorite, (req, res) => {
    res.sendStatus(200);
   });

   app.get('/getAllFavorites', favoriteController.getAllFavorites, (req, res) => {
      const { data } = res.locals;
      res.status(200).json({data: data});
   });

   app.delete('/deleteFavorite', favoriteController.deleteFavorite, (req, res) => {
    res.sendStatus(200);
   });





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