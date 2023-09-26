const express = require("express");

const authentication = require("../middleware/auth");
const userController = require("../controllers/userController");
const User = require("../modals/userModel");

const Router = express.Router();

Router.post("/API/LogIn", userController.logIn);

Router.get("/API/logOut", authentication.authenticate, userController.logOut);

module.exports = Router;
