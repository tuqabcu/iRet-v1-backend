// Copyright ©,2023, Birmingham City University

// var userCtrl 	= require('./app/controllers/user');
var userRoutes = require("./app/routes/user");
var projectRoutes = require("./app/routes/project");
var constructionRoutes = require("./app/routes/construction");
var materialRoutes = require("./app/routes/material");

/*
	API routes resources
*/

exports.route = function (app) {
  // app.use(userCtrl.validateSession);

  app.use("/users", userRoutes);
  app.use("/projects", projectRoutes);
  app.use("/constructions", constructionRoutes);
  app.use("/materials", materialRoutes);
};
