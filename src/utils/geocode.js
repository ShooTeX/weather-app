const request = require("request");

const getLocation = address =>
  new Promise(resolve => {
    const location =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1Ijoic2hvb3RleCIsImEiOiJjanUzZDJwazkwbTBtNDRxZ211dHBzY3JtIn0.j5kFJFU5xiM19qC2LvC4Jw&limit=1";
    request({ url: location, json: true }, (error, response) => {
      const {
        body: {
          features: [
            {
              center: [long, lat]
            }
          ]
        }
      } = response;
      resolve([long, lat]);
    });
  });

module.exports = {
  getLocation: getLocation
};
