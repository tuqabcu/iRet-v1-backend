// Copyright ©,2023, Birmingham City University

var express = require("express");
var router = express.Router();
var materialCtrl = require("../controllers/material");
const auth = require("../middleware/auth");

//Everything is Authinticated below
router.use(auth);

router.get("/", materialCtrl.getMaterials);
router.post("/", materialCtrl.create);

module.exports = router;
