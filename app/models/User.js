// Copyright ©,2023, Birmingham City University

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var bcrypt 		= require('bcrypt');
var async = require("async");
var uuid = require("node-uuid");
var cache = require("../utils/cacheHandler");
var utilities = require("../utils/utilities");

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["asessor"],
    default: "asessor",
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
