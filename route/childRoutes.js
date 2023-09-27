const express = require("express");

const childController = require("../controllers/childController");

const authentication = require("../middleware/auth");

const Router = express.Router();

Router.get(
  "/API/get-child",
  authentication.authenticate,
  childController.getChild
);

Router.post(
  "/API/create-child",
  authentication.authenticate,
  childController.createChild
);

Router.post(
  "/API/update-child",
  authentication.authenticate,
  childController.updateChild
);

Router.post(
  "/API/remove-child",
  authentication.authenticate,
  childController.removeChild
);

module.exports = Router;
