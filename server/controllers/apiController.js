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


/////////////////////////////////////////////////////////////////////////////////////////////////////////

// fetch and return locations based off a query
apiController.getLocationResults = async (req, res, next) => {
  try {
    // make sure key exists
    if (key === undefined) {return next({log: "API key is undefined"})}

    const { query } = req.body;
    const location = res.locals.addressLocation
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`
    // );
    
    // location must be converted to lat long
    // const response = await client.placesNearby({ params: { keyword: query, radius: 2, location: location, key: key}});
    console.log('location =', location)
    const response = await client.PlacesNearby({ params: { keyword: query, location: location, key: key}});
    console.log('data recieved: ', response)
    next()
    const data = await response.json();
    
    const results = data.results;

    const arrayOfPlaces = [];
    results.forEach((el) => {
      arrayOfPlaces.push({name: el.name, address: el.formatted_address, distance: undefined});
    });
    
     // includes a lat and lng property --- {coordinates: [lat, lng]} pls
     
    res.locals.rawData = arrayOfPlaces;
    return next();
    
  } catch (err) {
    // console.log(err);
    return next({ log: `error in getLocationResults middleware. Error: ${err}` });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

// apiController.walkingDistance = async (req, res, next) => {
//   try {
//   const { addressLocation } = res.locals;
//   const { rawData } = res.locals; 

//     for (let i = 0; i < rawData.length; i++) {
//       const formatedPlaceLocation = `${rawData[i].coordinates[0]},${rawData[i].coordinates[1]}`
//       const response = client.directions({
//         params: {
//           origin: addressLocation,
//           destination: formatedPlaceLocation,
//           mode: 'walking',
//           key: key,
//         }
//       })
//       console.log(response);
//       rawData[i].distance = ``
      
      
//     }
//   }
//   catch(e) {

//   }; 
// };


////////////////////////////////////////////////////////////////////////////////////////////////////

apiController.getCurrentLocation = async (req, res, next) => {
    try {
        const response = await client.geolocate( {
            params: {
                key: key,
            }
        });
        // @ts-ignore
        const {lat, lng} =  response.data.location; // pulls lat and lng of current location;
        res.locals.currentLocation = [lat, lng];
        next();
    }
    catch (e) {
        console.log(e);
        next(e);
    };
};

///////////////////////////////////////////////////////////////////////////////////////////////

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
        res.locals.addressLocation = [lat, lng];
        next();
    }

    catch (e) {
        console.log(e);
        next(e);
    };
};


// request - Obtain Location Coordinates, Obatain List of Resturants Near by - Iterate over array of objects, and retreive walking time data for each
// resturant - then format it all [Name, Address, Walking Distance]




module.exports = apiController;
