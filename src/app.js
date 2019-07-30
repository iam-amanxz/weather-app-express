const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// setting up releative path
const pathPublic = path.join(__dirname, "../public");
// customizing view path
const pathView = path.join(__dirname, "../templates/views");
// setting up path for partials
const partialsPath = path.join(__dirname, "../templates/partials");
// setting up handlebars view engine
app.set("view engine", "hbs");
// setting up view path
app.set("views", pathView);
// setting up path for partials
hbs.registerPartials(partialsPath);
// setting root route to serve public directory
app.use(express.static(pathPublic));

// setting up dynamic root in views folder
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

//setting up a 404 page for nested pages
app.get("/help/*", (req, res) => {
  res.send("Hello article not found!");
});

app.get("*", (req, res) => {
  res.send("Hello 404!");
});

//setting up server
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
