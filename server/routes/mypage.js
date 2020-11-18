var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('mypage/mypage_main',{name:req.session.user.name});
})

module.exports = router;