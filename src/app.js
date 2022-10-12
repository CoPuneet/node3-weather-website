const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const e = require("express");

//defining paths for config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setting up template engine--handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

//setting up partials
hbs.registerPartials(partialsPath);

//serving public directory
app.use(express.static(publicDirPath));

//app.com
//app.com/help
//app.com/about

// app.get("", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });

//setting route to show index view
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Puneet",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "If You need help.",
    name: "Puneet",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Puneet Yadav",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error });
    } else {
      console.log(response);
      const { latitude, longitude, location } = response;
      if (response.error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  });

  //   res.send({
  //     forcast: "It is snowing",
  //     location: "Philadelphia",
  //     address: req.query.address,
  //   });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Puneet yadav",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Puneet yadav",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on Port 3000");
});
