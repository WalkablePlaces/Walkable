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


apiController.getCurrentLocation = async (req, res, next) => {
    try {
        const response = await client.geolocate( {
            params: {
                key: key,
            }
        });
        // @ts-ignore
        const {lat, lng} =  response.data.location; // pulls lat and lng of current location;
        next();
    }
    catch (e) {
        console.log(e);
        next(e);
    };
};


apiController.addressToLocation = async (req, res, next) => {
    try {
        const response = await client.geocode({
            params: {
                address: '136 Via Murcia, 92672',
                key: key,
            }
        })
        const { lat, lng } = response.data.results[0].geometry.location;
        console.log(lat, lng);
        next();
    }

    catch (e) {
        console.log(e);
        next(e);
    };
};






module.exports = apiController;
