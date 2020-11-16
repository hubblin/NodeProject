var express = require('express');
var router = express.Router();

const indexController = require('../controller/indexController');
const Index = new indexController();

/* GET home page. */
router.get('/', Index.getInfo_main,function(req, res, nextz) {
  if(req.session.user){
    console.log('메인화면 이름 ',req.session.user.name);
    res.render('index',{name:req.session.user.name, reviewMain: req.review_main})
  }
  else{
    res.render('index',{name:false, reviewMain:req.review_main});  
  }
});



module.exports = router;