const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../modals/userModel");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = jwt.verify(token, "123456789");

    if(!token || !decodedToken){
      return res.status(200).json({ message : "Token Not Verified" , success : false})
    }

    const userFound = await User.findById(decodedToken.userId);

    if (this.isEmpty(userFound) === true) {
      return res.status(400).json({ message: "User Not Found" });
    }
    if (userFound.lastActive === "true") {
      req.user = userFound;
      next();
    } else {
      return res.status(400).json({ message: "User is inactive" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

exports.isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
