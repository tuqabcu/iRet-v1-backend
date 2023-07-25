var express = require('express');
var router = express.Router();
var constructionCtrl = require('../controllers/construction');
const auth = require("../middleware/auth");

//Everything is Authinticated below
router.use(auth)

router.get('/user/:user_id', constructionCtrl.getUserConstructions);
router.post('/', constructionCtrl.create);


module.exports = router;