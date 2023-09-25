const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../modals/userModal");
const State = require("../modals/stateModal");
const District = require("../modals/districtModal");

const authentication = require("../middleware/auth");
const { ObjectId } = require("mongodb");

const Router = express.Router();

Router.post("/API/Login", async (req, res, next) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "User already created" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      // lastActive : new Date()
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "123456789");

    res.status(200).json({
      success: "true",
      message: "User logged in !!! ",
      token: token,
      newUser: newUser,
      loginId: newUser._id,
      lastActive: newUser.lastActive,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

Router.get(
  "/API/logOut",
  authentication.authenticate,
  async (req, res, next) => {
    try {
      // const loggedOutUser = await  User.findById(user.id)
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

Router.get("/API/get-state", async (req, res, next) => {
  try {
    const states = await State.find({});
    if (!states) {
      return res.status(400).json({ message: "No states to be Found" });
    }

    res.status(200).json({
      message: "State Detail",
      timeStamp: new Date(),
      states: states,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

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

Router.get("/API/get-district", async (req, res, next) => {
  try {
    const { state_id } = req.query;
    console.log("statedID >>>>>> ", state_id);

    if (!state_id) {
      return res.status(400).json({ message: "State ID missing" });
    }

    const district = await District.find({ State_id: state_id });

    if (!district) {
      return res.status(400).json({ message: "Cannot Find State" });
    }

    res.status(200).json({
      success: true,
      message: "District Detail",
      timeStamp: new Date(),
      Districts: district,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

module.exports = Router;
