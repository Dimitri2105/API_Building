// import { createClient } from 'redis';

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const { createClient } = require("redis");

const client = createClient({
  url: 'redis://default:rInFdMk3L9zU6UX9kFlRH2udrQozJ62w@redis-18001.c212.ap-south-1-1.ec2.cloud.redislabs.com:18001'
});
const redisConnection = async () => {
  
  client.on("connect", function () {
    console.log("Redis Connected Successfully.....");
  });

  await client.connect();

}
redisConnection()

module.exports.client = client


// module.exports.redisConnection = redisConnection


const setupConnection = require("./connect");

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

// module.exports = app;
