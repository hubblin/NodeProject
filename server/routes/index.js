var express = require('express');
var router = express.Router();




/* GET home page. */

router.get('/',function(req, res, next) {
  if(req.session.user){
    console.log(req.session.user.name);
    res.render('index',{name:req.session.user.name})
  }
  else{
    res.render('index',{name:false});  
  }
  

});



module.exports = router;