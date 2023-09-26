const express = require('express')

const districtController = require('../controllers/districtController')

const Router = express.Router()

Router.get("/API/get-district",districtController.getDistricts);
  
Router.post("/API/create-district", districtController.createDistrict);

module.exports = Router