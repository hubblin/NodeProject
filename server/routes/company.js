var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
    res.render('company_page/company_mypage', {name:req.session.user.name})
})

module.exports = router;