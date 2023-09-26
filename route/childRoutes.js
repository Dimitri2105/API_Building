const express = require('express')

const childController = require('../controllers/childController')

const Router = express.Router()

Router.get("/API/get-child",childController.getChild);
  
Router.post("/API/create-child",childController.createChild);

module.exports = Router