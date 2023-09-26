const express = require('express')

const stateController = require('../controllers/stateController')

const Router = express.Router()

Router.get("/API/get-state", stateController.getStates);
  
Router.post("/API/create-state", async (req, res, next) => {
    try {
      const { statename } = req.body;
  
      if (!statename) {
        return res.status(200).json({ message: "State Name absent" });
      }
  
      const existingState = await State.findOne({ statename });
  
      if (existingState) {
        return res.status(400).json({ message: "State Name already exists" });
      }
      const state = new State({
        statename,
      });
  
      await state.save();
  
      res.status(200).json({
        message: "Success",
        statename: state,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  });

module.exports = Router;
