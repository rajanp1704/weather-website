const request = require('request');

//////////// // // // Forward Geocoding using Mapbox with CALLBACK

const geoCode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFqYW4tcGFkYXJpeWEiLCJhIjoiY2xkeTZzNzVtMG9hcDNwbnd2aGFkcHVwZyJ9.APp0JrRBQLoFl2s0foWbQQ&limit=1`;

  request({ url: geocodeURL, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to weather service!`, undefined);
    } else if (body.features.length === 0) {
      callback(
        `Unable to fetch data for current location use something else!`,
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name,
      });
    }
  });
};
//////////////

module.exports = geoCode;
