const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const ObjectId = require("mongoose").Types.ObjectId;

const User = require("../modals/userModel");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = jwt.verify(token, "123456789");

    if (!token || !decodedToken) {
      throw Error("Token Not Verified");
    }

    const userFound = await User.findById(decodedToken.userId);

    if (!userFound || !userFound.length) {
      throw Error("User Not Found");
    }

    if (userFound && userFound.lastActive === "true") {
      req.user = userFound;
      next();
    } else {
      throw Error("User is inactive");
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

exports.isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
