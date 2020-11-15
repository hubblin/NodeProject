const { render } = require('ejs');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/sign_up', function(req, res, next) {
  res.render('user/sign_up');
});

router.get('/sign_in', function(req, res, next){

  res.render('user/sign_in');
});
module.exports = router;
