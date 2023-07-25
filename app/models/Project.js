var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var bcrypt 		= require('bcrypt');
var async = require("async");
var uuid = require("node-uuid");
var cache = require("../utils/cacheHandler");
var utilities = require("../utils/utilities");

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  deletedOn: { type: Date, default: null },
});

module.exports = mongoose.model("Project", ProjectSchema);
