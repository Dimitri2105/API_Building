const express = require("express");

const districtController = require("../controllers/districtController");

const authentication = require("../middleware/auth");

const Router = express.Router();

Router.get(
  "/API/get-district",
  authentication.authenticate,
  districtController.getDistricts
);

Router.post(
  "/API/create-district",
  authentication.authenticate,
  districtController.createDistrict
);

Router.post(
  "/API/update-district",
  authentication.authenticate,
  districtController.updateDistrict
);

Router.post(
  "/API/remove-district",
  authentication.authenticate,
  districtController.removeDistrict
);

module.exports = Router;
