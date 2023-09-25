const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../modals/userModal");

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  const decodedToken = jwt.verify(token, "123456789");

  try {
    const userFound = await User.findById(decodedToken.userId);

    if (!userFound) {
      return res.status(400).json({ message: "User Not Found" });
    }

    req.user = userFound;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
