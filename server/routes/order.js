var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if(req.session.user){
        res.render('product/order',{name:req.session.user.name});
    }
    else{
        res.render('product/order',{name:false});
    }
});

//여기 거쳐서
router.post('/temp_buy', function(req,res){
    req.session.imageurl = req.body.imageurl;
    res.redirect('/order/buy');
})

//여기로 온다
router.get('/buy', function(req,res){
    if(req.session.user){
        res.render('product/buy',{name:req.session.user.name, imageurl : req.session.imageurl});
    }
    else{
        res.render('product/buy',{name:false,imageurl : req.session.imageurl});
    }

})


router.get('/makingbuy', function(req,res){

    if(req.session.user){
        res.render('product/makingbuy',{name:req.session.user.name, imageurl : req.session.imageurl});
    }
    else{
        res.render('product/makingbuy',{name:false,imageurl : req.session.imageurl});
    }

})


module.exports = router;