// Copyright ©,2023, Birmingham City University

var express = require("express");
var router = express.Router();
var userCtrl = require("../controllers/user");
// const auth = require("../middleware/auth");

// Non-Authinticated
router.post("/", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
