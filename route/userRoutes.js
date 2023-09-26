const express = require("express");

const authentication = require("../middleware/auth");
const userController = require('../controllers/userController')

const Router = express.Router();

Router.post("/API/Login", userController.logIn);
  
  Router.get(
    "/API/logOut",
    authentication.authenticate,
    async (req, res, next) => {
      try {
        const loggedOutUser = await User.findByIdAndRemove(req.user._id);
  
        res.status(200).json({
          success: "true",
          message: "User logged out !!! ",
          User: loggedOutUser,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
      }
    }
  );


module.exports = Router