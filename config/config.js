// Copyright ©,2023, Birmingham City University

require("dotenv").config();

var config = {};

config.secret = "";

config.server = {
  host: process.env.SERVER_HOST || "localhost",
  port: process.env.SERVER_PORT,
};
config.db = {
  url: process.env.DATABASE_URL,
};
config.redis = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
};
module.exports = config;
