const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function signup(req, res, next) {
  try {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
      return next(
        new Error(
          "Enter the following details: First name, Last name, an Email and a password"
        )
      );
    }
    const user = await userModel.create({
      email,
      password,
      firstname,
      lastname,
    });
    const payload = { user: { id: user._id, email: user.email } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    user.password = undefined; //a trick to prevent the password from being displayed, does not affect the actual password.
    return res.status(200).json({ status: "success", token, user });
  } catch (error) {
    res.status(500).send("Something broke");
    // next(error)
  }
}

// Log In
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error("email and password required"));
    }
    const user = await userModel.findOne({ email });
    if (!user) return next(new Error("User does not exist"));
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) return next(new Error("password is incorrect !"));
    const payload = { user: { id: user._id, email: user.email } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    user.password = undefined; //a trick to prevent the password from being displayed, does not affect the actual password.
    return res.status(200).json({ status: "success", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something broke");
  }
}

module.exports = {
  signup,
  login,
};
