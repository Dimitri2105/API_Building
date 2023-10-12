// import { generateToken } from "../../controllers/userController";
const userController = require('../../controllers/userController')
const generateToken = userController.generateToken
const mongoose = require("mongoose");
const app = require("../../app");

const userOne = {
  id: "65279b8885119410cc05d63c",
};
const getToken = () => {
  return generateToken(userOne.id);
};
console.log("getToken >>>>>" , getToken())
module.exports = {
  getToken,
};
