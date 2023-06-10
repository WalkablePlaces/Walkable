// const { resourceLimits } = require('worker_threads');

const googleMaps = require('@googlemaps/google-maps-services-js');
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

const apiController = {};
// API's

// https://developers.google.com/maps/documentation/javascript/places
// https://developers.google.com/maps/documentation/places/web-service

//
const key = process.env.GOOGLE_API_KEY;

apiController.getLocationResults = async (req, res, next) => {
  try {
    
    
    const { query } = req.body;
    console.log(req.body)
    console.log(query)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`
    );
    const data = await response.json();
    const results = data.results;

    const arrayOfPlaces = [];
    results.forEach((el) => {
      arrayOfPlaces.push({name: el.name, address: el.formatted_address, distance: undefined});
    });
    res.locals.rawData = arrayOfPlaces;
    return next();
  } catch (err) {
    console.log(err);
    return next({ log: `error in getLocationResults middleware. Error: ${err}` });
  }
};

apiController.compareDistances = (req, res, next) => {
  // compare two input locations
  // add a distance to res.locals
};

// apiController.getCurrentLocation = async (req, res, next) => {
//     try {
//   const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json
//   ?destinations=New%20York%20City%2C%20NY
//   &origins=Washington%2C%20DC%7CBoston
//   &units=imperial
//   &key=${key}`)
//   ;
//   // const data = await response.json();
//   console.log(response)
  
//   res.locals.currentLocation = response;
//   next();
//     }
//     catch (e) {
//         console.log(e);
//     };
// };


apiController.getCurrentLocation = async (req, res, next) => {
    try {
        const response = await client.geolocate( {
            params: {
                key: key,
            }
  
        });

        console.log(response);
    }
    catch (e) {
        console.log(e);
    };
};






module.exports = apiController;
