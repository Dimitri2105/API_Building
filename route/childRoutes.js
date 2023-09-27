const express = require('express')

const childController = require('../controllers/childController')

const Router = express.Router()

Router.get("/API/get-child",childController.getChild);
  
Router.post("/API/create-child",childController.createChild);

Router.post("/API/update-child" ,childController.updateChild)

Router.post("/API/remove-child",childController.removeChild)

module.exports = Router