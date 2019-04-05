const request = require("request");
const geocode = require("./geocode");

const getWeather = async (address, callback) => {
  const location = await geocode.getLocation(address);
  const weather =
    "https://api.darksky.net/forecast/31e125debcb612f92a9281757a2ac608/" +
    location[1] +
    "," +
    location[0] +
    "?units=si";
  request({ url: weather, json: true }, (error, response) => {
    const {
      body: { currently }
    } = response;

    const forecast = String(
      "It is currently " +
        currently.temperature +
        "°C out. There is a " +
        currently.precipProbability +
        "% chance of rain."
    );

    callback(forecast);
  });
};

module.exports = {
  getWeather: getWeather
};
