const express = require('express')

const districtController = require('../controllers/districtController')

const Router = express.Router()

Router.get("/API/get-district",districtController.getDistricts);
  
Router.post("/API/create-district", districtController.createDistrict);

Router.post('/API/update-district' , districtController.updateDistrict)

module.exports = Router