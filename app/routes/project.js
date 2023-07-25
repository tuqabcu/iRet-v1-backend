var express = require("express");
var router = express.Router();
var projectCtrl = require("../controllers/project");
const auth = require("../middleware/auth");

//Everything is Authinticated below
router.use(auth);

router.get("/user/:user_id", projectCtrl.getUserProjects);
router.post("/", projectCtrl.create);
router.delete("/:project_id", projectCtrl.deleteProject);

module.exports = router;
