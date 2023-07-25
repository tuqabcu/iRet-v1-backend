// Copyright ©,2023, Birmingham City University

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var bcrypt 		= require('bcrypt');
var async = require("async");
var uuid = require("node-uuid");
var cache = require("../utils/cacheHandler");
var utilities = require("../utils/utilities");

var MaterialSchema = new Schema({
  // user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  type: {
    type: String,
    enum: ["Mas", "NoMas", "Glazing", "WindowGas", "AirGap"],
  },
  name: {
    type: String,
  },
  thermalResistance: {
    type: String,
  },

  gasType: {
    type: String,
  },
  thickness: {
    type: String,
  },

  opticalDataType: {
    type: String,
  },
  solarTransmittance: {
    type: String,
  },
  frontSolarReflectance: {
    type: String,
  },
  backSolarReflectance: {
    type: String,
  },

  visibleTransmittance: {
    type: String,
  },
  frontVisibleReflectance: {
    type: String,
  },
  backVisibleReflectance: {
    type: String,
  },
  infraredTransmittance: {
    type: String,
  },
  frontInfraredHemispherical: {
    type: String,
  },
  backInfraredHemispherical: {
    type: String,
  },
  conductivity: {
    type: String,
  },
  density: {
    type: String,
  },
  specificHeat: {
    type: String,
  },
  roughness: {
    type: String,
  },
  thermalAbsorptance: {
    type: String,
  },
  solarAbsorptance: {
    type: String,
  },
  visibleAbsorptance: {
    type: String,
  },
  shared: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Material", MaterialSchema);
