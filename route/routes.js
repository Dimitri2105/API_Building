const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../modals/userModal");
const authentication = require('../middleware/auth')

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

Router.get('/API/logOut' , authentication.authenticate , async(req,res,next) =>{
    try{
        // const loggedOutUser = await  User.findById(user.id)
        const loggedOutUser = await  User.findByIdAndRemove(req.user._id)

        res.status(200).json({
            success: "true",
            message: "User logged out !!! ",
            User: loggedOutUser,
          });

    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
      }

})



module.exports = Router;
