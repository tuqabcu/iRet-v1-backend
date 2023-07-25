require('dotenv').config()

const jwt = require("jsonwebtoken");

const config = process.env;


// exports.verifyToken = async function (req, res) {

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({message:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({message:"Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;
