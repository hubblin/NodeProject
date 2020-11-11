var express = require('express');
var router = express.Router();
const indexController = require('../controller/indexController')
const Index = new indexController();



/* GET home page. */
router.get('/',Index.getUserInfo,function(req, res, next) {
  res.render('index');
});



module.exports = router;