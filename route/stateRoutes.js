const express = require('express')

const stateController = require('../controllers/stateController')
const userValidation = require('../middleware/userValidation')
const authentication = require('../middleware/auth')

const Router = express.Router()

Router.get("/API/get-state",authentication.authenticate,stateController.getStates);
  
Router.post("/API/create-state",authentication.authenticate,stateController.createState );

Router.post("/API/update-state" ,authentication.authenticate, stateController.updateState)

Router.post("/API/remove-state" ,authentication.authenticate, stateController.removeState)

module.exports = Router;
