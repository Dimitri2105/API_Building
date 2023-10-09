const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const User = require("../modals/userModel");

exports.logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw Error("Fields Missing");
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw Error("User already created");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      lastActive: true,
    });

    await newUser.save();

    const token = jwt.sign(
      // { userId: newUser._id,exp: Math.floor(Date.now() / 1000) + (30 * 60), },
      { userId: newUser._id },
      "123456789"
    );

    res.status(200).json({
      success: true,
      message: "User logged in !!! ",
      token: token,
      data: newUser,
      loginId: newUser._id,
      lastActive: newUser.lastActive,
      timeStamp: moment().unix(),
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.logOut = async (req, res, next) => {
  try {
    const loggedOutUser = await User.findByIdAndUpdate(req.user._id, {
      lastActive: false,
    });
    // if(!loggedOutUser){
    //   throw Error ("User not found")
    // }

    res.status(200).json({
      success: true,
      message: "User logged out !!! ",
      data: loggedOutUser,
      timeStamp: moment().unix(),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
