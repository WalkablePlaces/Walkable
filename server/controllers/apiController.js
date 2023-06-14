const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

const apiController = {};
// api key is saved in a .env file, then brought into global scope
const key = process.env.GOOGLE_API_KEY;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// convert an address to lattitude and longitude (necessary for determining distances from/to locations)

apiController.addressToLocation = async (req, res, next) => {
  try {
    const { query } = req.body;
    const response = await client.geocode({
      params: {
        address: query,
        key: key,
      }
    })
    const { lat, lng } = response.data.results[0].geometry.location;
    res.locals.addressLocation = [lat, lng];
    next();
  }
  catch (e) {
    next({
      log: 'Express error handler caught addressToLocation middleware error',
      status: 400,
      message: { err: 'An error occurred', error: e },
    });
  };
};

// fetch and return locations based off a query
apiController.getLocationResults = async (req, res, next) => {
  try {
    // define information to be used in fetch request
    const { addressLocation } = res.locals;
    const location = `${addressLocation[0]},${addressLocation[1]}`
    const { keywordChoice } = req.body;
    const radius = 1100;
    const type = 'restaurant';

    // fetch google-maps api data (only works on one line for some reason)
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keywordChoice}&key=${key}`

    const response = await fetch(url)

    // format response
    const data = await response.json();
    const results = data.results;

    // fill array with relevant info, distance lat,lng will be converted in following middleware
    const arrayOfPlaces = [];

    //Need to put logic in here for whatever other information we want to put in ex: ratings, phone number, etc
    results.forEach((el) => {
      arrayOfPlaces.push({ name: el.name, address: el.vicinity, distance: `${el.geometry.location.lat},${el.geometry.location.lng}`, walkTime: undefined, walkTimeNum: undefined, favorited: false });
    });


    // add data to locals
    res.locals.rawData = arrayOfPlaces;
    return next();

  } catch (err) {
    console.log(err.message);
    return next({
      log: 'Express error handler caught getLocationResults middleware error',
      status: 400,
      message: { err: 'An error occurred', error: e },
    });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

// add walking distance information to array of places, replaces lng,lat with a distance
apiController.walkingDistance = async (req, res, next) => {
  try {
    // get info for calculating distance
    const { addressLocation } = res.locals;
    const { rawData } = res.locals;
    const formattedAddressLocation = `${addressLocation[0]},${addressLocation[1]}`;

    for (let i = 0; i < rawData.length; i++) {

      const formatedPlaceLocation = rawData[i].distance

      const response = await client.directions({
        params: {
          origin: formattedAddressLocation,
          destination: formatedPlaceLocation,
          mode: 'walking',
          key: key,
        }
      })
      const distance = response.data.routes[0].legs[0].distance.text;
      const walkTime = response.data.routes[0].legs[0].duration.text;
      const distanceResponse = `Distance: ${distance}`
      const walkTimeResponse = `Walk-time: ${walkTime}`
      rawData[i].distance = distanceResponse;
      rawData[i].walkTime = walkTimeResponse;

      const index = walkTime.indexOf(' ');
      const walkTimeNum = walkTime.slice(0, index);
      rawData[i].walkTimeNum = Number(walkTimeNum);
      // console.log(rawData[i].walkTimeNum);
    }
    next();
  }
  catch (e) {
    next({
      log: 'Express error handler caught walkingDistance middleware error',
      status: 400,
      message: { err: 'An error occurred', error: e },
    });
  };
};


////////////////////////////////////////////////////////////////////////////////////////////////////

// possible stretch feature: get locations near me, as opposed to inputting an address
apiController.getCurrentLocation = async (req, res, next) => {
  try {
    const response = await client.geolocate({
      params: {
        key: key,
      }
    });
    // @ts-ignore
    const { lat, lng } = response.data.location; // pulls lat and lng of current location;
    res.locals.currentLocation = [lat, lng];
    next();
  }
  catch (e) {
    next({
      log: 'Express error handler caught getCurrentLocation middleware error',
      status: 400,
      message: { err: 'An error occurred', error: e },
    });
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////







module.exports = apiController;
