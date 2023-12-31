const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../modals/userModel");
const State = require("../modals/stateModel");
const District = require("../modals/districtModel");
const Child = require("../modals/childModel");

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

Router.post("/API/create-district", async (req, res, next) => {
  try {
    const { State_id, districtName } = req.body;

    if (!State_id || !districtName) {
      return res
        .status(400)
        .json({ message: "State ID or District Name missing" });
    }

    const district = new District({
      State_id,
      districtName,
    });

    await district.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "District created Successfully",
      district: district,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

Router.get("/API/get-child", async (req, res, next) => {
  try {
    const child = await Child.find({});
    if (!child) {
      return res.status(400).json({ message: "No child data to be Found" });
    }

    res.status(200).json({
      success: "true",
      message: "Child Profile Detail",
      timeStamp: new Date(),
      child_profile: child,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

Router.post("/API/create-child", async (req, res, next) => {
  try {
    const { name, sex, dob, father_name, mother_name, district_id } = req.body;

    if (!name || !sex || !dob || !father_name || !mother_name) {
      return res.status(400).json({ message: "All fields are required " });
    }

    const child = new Child({
      name,
      sex,
      dob,
      father_name,
      mother_name,
      district_id,
    });

    await child.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Child created Successfully",
      child: child,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

module.exports = Router;
