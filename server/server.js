
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


const apiController = require('./controllers/apiController');

app.use(bodyParser.json())

const key = process.env.GOOGLE_API_KEY;





app.get('/testDistance', async (req, res) => {
  try {
    const origin1 = '40.758896,-73.985130';
    const destination1 = '40.782864,-73.965355';

   const response = await client.directions ({
      params: {
        origin: origin1,
        destination: destination1,
        mode: 'walking',
        key: key,
      }
    });
    const distance = response.data.routes[0].legs[0].distance.text;
    const walkTime = response.data.routes[0].legs[0].duration.text;
    const walkTimeResponse = `Distance is ${distance}, Walk-time is ${walkTime}`
    console.log(walkTimeResponse);
    console.log(distance, walkTime);
  }
  catch(e) {
    console.log(e);
  }

});

// returns a list of nearby resturant names, addresses, and distances
app.post('/getLocationResults', apiController.addressToLocation, apiController.getLocationResults, apiController.walkingDistance, (req, res) => {
    res.status(200).json({places: res.locals.rawData});
   })



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