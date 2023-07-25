var config = require("./config/config");
var server = require("./config/server");
var router = require("./router");
var db = require("./config/db");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");
const cors = require("cors");
const fs = require("fs");
const csv=require('csvtojson')

var app = express();
app.use(cors());

/*
	DB Connection
*/
db.connect();
db.sync();

/*
	App Config
*/
server.config(app);

/*
	API Routing
*/
router.route(app);

/*
	Start server
*/
app.set("port", config.server.port);
app.use("/files",express.static('files'));



async function getCities(req, res) {
	const jsonArray=await csv().fromFile(__dirname+'/files/weather.csv');
	res.send(jsonArray);
}

app.get('/cities', getCities)

app.listen(app.get("port"), function () {
  console.log("Server listenting on ");
});

// export app so we can test it
exports = module.exports = app;
