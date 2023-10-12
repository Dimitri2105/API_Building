const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const User = require("../modals/userModel");

exports.signUp = async (req, res, next) => {
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

    res.status(200).json({
      success: true,
      message: "User Signed Up !!! ",
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

function generateToken(id) {
  return jwt.sign(
    // { userId: newUser._id,exp: Math.floor(Date.now() / 1000) + (30 * 60), },
    { id },
    "123456789"
  );
}
exports.logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw Error("Fields Missing");
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw Error("User not found");
    } else {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result === true) {
          res.status(200).json({
            success: true,
            message: "User logged in !!! ",
            token: generateToken({ userId: user._id }),
            data: user,
            loginId: user._id,
            lastActive: user.lastActive,
            timeStamp: moment().unix(),
          });
        } else {
          throw Error("User not authorized");
        }
      });
    }
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
