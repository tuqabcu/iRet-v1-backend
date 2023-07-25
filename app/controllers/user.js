// Copyright ©,2023, Birmingham City University

require("dotenv").config();

var User = require("../models/User");
const jwt = require("jsonwebtoken");
var utilities = require("../utils/utilities");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(plain_password) {
  let salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plain_password, salt);
}

async function validatePassword(plain_password, hash) {
  return bcrypt.compare(plain_password, hash);
}

async function createToken(user) {
  // Create token
  const token = await jwt.sign(
    { user_id: user._id, email: user.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "10000h",
    }
  );
  // save user token
  return token;
}

exports.login = async function (req, res) {
  try {
    let body = req.body;

    if (!body.email || !body.password)
      return utilities.handleError(res, {
        status: 400,
        message: "Missing parameters",
      });

    // Checking if email is stored
    let user = await User.findOne({ email: body.email });

    // Validating password and Hash
    let validatedPassword = await validatePassword(
      body.password,
      user.password
    );

    if (user && validatedPassword) {
      // Token Generation for validation session
      user.token = await createToken(user);

      res.json({ ...user["_doc"], token: user.token });
    } else {
      return utilities.handleError(res, {
        status: 400,
        message: "Account doesn't exist or Password is Wrong!",
      });
    }
  } catch (error) {
    return utilities.handleError(res, {
      status: 400,
      message: error.message,
    });
  }
};

exports.signup = async function (req, res) {
  try {
    let body = req.body;
    // Params Checking
    if (!body.email || !body.password || !body.name)
      return utilities.handleError(res, {
        status: 400,
        message: "Missing parameters",
      });

    // Email Validation Checking
    var isValid = utilities.validateEmail(body.email);
    if (!isValid) {
      return utilities.handleError(res, {
        status: 400,
        message: "Email format is incorrect",
      });
    }

    // Email Uniquness Checking
    let isExist = await User.findOne({ email: body.email });
    if (isExist) {
      return utilities.handleError(res, {
        status: 400,
        message: "Email already in use",
      });
    }

    // hashing the password
    body.password = await hashPassword(body.password);

    // Account Creation
    let user = await new User(body).save();

    // Token Generation for validation session
    user.token = await createToken(user);
    res.json({ ...user["_doc"], token: user.token });
  } catch (error) {
    return utilities.handleError(res, {
      status: 400,
      message: error.message,
    });
  }
};
