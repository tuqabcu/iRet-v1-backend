var Construction = require("../models/Construction");
var utilities = require("../utils/utilities");
const mongoose = require("mongoose");

// question?
// If a logged in user created a construction or material, are they going to be associated to him only? or they'll appear to the other users when they open the materials or constructions lists?

exports.create = async function (req, res) {
  try {
    let body = req.body;

    if (!body.name || !body.materials || !body.user || !body.type)
      return utilities.handleError(res, {
        status: 400,
        message: "Missing parameters",
      });
    body.user = mongoose.Types.ObjectId(body.user);

    // Construction Creation
    let construction = await new Construction(body).save();
    res.json(construction);
  } catch (error) {
    return utilities.handleError(res, {
      status: 400,
      message: error.message,
    });
  }
};

exports.getUserConstructions = async function (req, res) {
  try {
    if (!req.params || !req.params.user_id)
      return utilities.handleError(res, {
        status: 400,
        message: "Missing parameters",
      });
    console.log(req.params.user_id);

    // get user constructions
    let constructions = await Construction.find({
      user: mongoose.Types.ObjectId(req.params.user_id),
    }).populate("materials");
    res.json(constructions);
  } catch (error) {
    return utilities.handleError(res, {
      status: 400,
      message: error.message,
    });
  }
};
