const express = require("express");
const { signup, login } = require("../Controllers/authToken.controller");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);

module.exports = authRouter;
