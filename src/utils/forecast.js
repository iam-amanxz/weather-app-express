const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/b43417175e95c56b8b53e5f2374fccd1/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    //getting data from api and saving it in variables
    const summary = body.daily.data[0].summary;
    const temperature = body.currently.temperature;
    const precipProbability = body.currently.precipProbability;
    const uvIndex = body.currently.uvIndex;
    const humidity = body.currently.humidity;
    const icon = body.currently.icon;

    //creating and array of imported data from api to pass it to the callback
    const info = [
      summary,
      temperature,
      precipProbability,
      uvIndex,
      humidity,
      icon
    ];

    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      //passing the weather forecase array as an argument
      callback(undefined, info);
    }
  });
};

module.exports = forecast;
