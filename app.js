const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const setupConnection = require('./connect')

const routes = require("./route/routes");
const userRoutes = require("./route/userRoutes");
const stateRoutes = require("./route/stateRoutes");
const districtRoutes = require("./route/districtRoutes");
const childRoutes = require("./route/childRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(routes)
app.use(userRoutes);
app.use(stateRoutes);
app.use(districtRoutes);
app.use(childRoutes);

setupConnection()
.then((result) => {
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });


// mongoose
//   .connect(
//     "mongodb+srv://karannewuser:fEmZhME5inEdMBMv@cluster0.knsqu0p.mongodb.net/API_BUILDING?retryWrites=true&w=majority"
//   )
//   .then((result) => {
//     console.log("Database connected successfully...");
//     app.listen(3000, () => {
//       console.log("Server listening on port 3000");
//     });
//   })
//   .catch((error) => {
//     console.error("Database connection error:", error);
//   });

module.exports = app;