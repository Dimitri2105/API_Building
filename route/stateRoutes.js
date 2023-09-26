const express = require('express')

const stateController = require('../controllers/stateController')

const Router = express.Router()

Router.get("/API/get-state", stateController.getStates);
  
Router.post("/API/create-state",stateController.createState );

Router.post("/API/update-state" , stateController.updateState)

Router.post("/API/remove-state" , stateController.removeState)

module.exports = Router;
