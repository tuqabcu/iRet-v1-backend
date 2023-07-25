// Copyright ©,2023, Birmingham City University

var Project = require("../models/Project");
var utilities = require("../utils/utilities");
const mongoose = require("mongoose");

exports.create = async function (req, res) {
  try {
    let body = req.body;

    if (!body.name || !body.user)
      return utilities.handleError(res, {
        status: 400,
        message: "Missing parameters",
      });
    body.user = mongoose.Types.ObjectId(body.user);
    // Project Creation
    let project = await new Project(body).save();
    res.json(project);
  } catch (error) {
    return utilities.handleError(res, {
      status: 400,
      message: error.message,
    });
  }
};

exports.getUserProjects = async function (req, res) {
  try {
    if (!req.params || !req.params.user_id)
      return utilities.handleError(res, {
        status: 400,
        message: "Missing parameters",
      });
    console.log(req.params.user_id);
    // get user projects
    let projects = await Project.find({
      user: mongoose.Types.ObjectId(req.params.user_id),
      deletedOn: null,
    }).sort({ createdOn: -1 });
    res.json(projects);
  } catch (error) {
    return utilities.handleError(res, {
      status: 400,
      message: error.message,
    });
  }
};

exports.deleteProject = async function (req, res) {
  try {
    if (!req.params || !req.params.project_id)
      return utilities.handleError(res, {
        status: 400,
        message: "Missing parameters",
      });

    console.log(req.params.project_id);

    let result = await Project.findByIdAndUpdate(
      req.params.project_id,
      { deletedOn: new Date() },
      { new: true, useFindAndModify: false }
    );

    res.json(result);
  } catch (error) {
    return utilities.handleError(res, {
      status: 400,
      message: error.message,
    });
  }
};
