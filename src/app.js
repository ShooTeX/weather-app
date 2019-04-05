const express = require("express");
const path = require("path");
const hbs = require("hbs");
const weather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const partialsDirectoryPath = path.join(__dirname, "../views/partials");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsDirectoryPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Erik Simon"
  });
});

app.get("/weather", ({ query: { address } }, res) => {
  if (address) {
    weather.getWeather(address, forecast =>
      res.send({
        forecast: forecast,
        location: address
      })
    );
  } else {
    res.send({
      error: "Please provide an address"
    });
  }
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => console.log("Server is up on port " + port));
