const request = require('request');

////////// // // // Weather API using WeatherStack using CALLBACK

const foreCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=48601aa29e64f666681e7f3d72f2a18d&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to weather service!`, undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

/////////////////

module.exports = foreCast;
