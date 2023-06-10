
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const apiController = require('./controllers/apiController');

app.use(bodyParser.json())

const key = process.env.GOOGLE_API_KEY;

app.get('/', (req, res) => {
  res.json({hello: 'goodbye'});
})

app.get('/nearby', async (req, res) => {
  try {
    const location = '40.782864,-73.965355'
    const keyword = 'pizza'
    const radius = 500;
    const type = 'restaurant';

    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.782864,-73.965355&radius=${radius}
    &type=${type}
    &keyword=${keyword}
    &key=AIzaSyD5sO1jAaATVRppccsvhUIyEc-wpgFQzLI`);

    // ok, so this is weird, depending on what I use template literals for, search results very, this works though
    // so i will look at it more later

    // glad its working that is stange though
    // i will save then push this version then
    const data = await response.json();
    console.log(data.results);
    res.send(data.results);
   
    
  } catch (err) {
    console.log(err.message);
  }
});



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
    console.log(response.data.routes[0].legs[0].distance);
  }
  catch(e) {
    console.log(e);
  }

});
 

app.get('/test', apiController.addressToLocation, (req, res) => {
    res.sendStatus(200);
});

app.post('/getLocationResults', apiController.addressToLocation, apiController.getLocationResults, (req, res) => {
    res.status(200).send({places: res.locals.rawData});
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