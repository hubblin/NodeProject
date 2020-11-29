var express = require('express');
var router = express.Router();


const orderController = require('../controller/orderController');
const Order = new orderController();

router.get('/', function(req, res) {
    if(req.session.user){
        res.render('product/order',{name:req.session.user.name});
    }
    else{
        res.render('product/order',{name:false});
    }
});


router.get('/finish', function(req,res){
    res.render('product/finish');
})

router.post('/order_buy',Order.SaveOrder, function(req, res, next){
    console.log(req.body);
    res.redirect('/order/finish');
})

router.get('/:product_num',Order.getOrder,function(req,res){
    if(req.session.user){
        res.render('product/order',{name:req.session.user.name, spd: req.spd});
    }
    else{
        res.render('product/order',{name:false, spd:req.spd});
    }
})

//여기 거쳐서
router.post('/temp_buy', function(req,res){
    // req.session.imageurl = req.body.imageurl;
    // res.redirect('/order/buy');
    if(req.session.user){
        console.log('로그인 함');
        req.session.imageurl = req.body.imageurl;
        res.redirect('/order/buy/'+req.body.product);
    }
    else{
        console.log('로그인 안함');
        res.send(`<script type="text/javascript">
            alert("로그인이 필요합니다"); 
            location.href='/users/sign_in';
            </script>`)
    }
})

//여기로 온다
router.get('/buy/:product_num',Order.getOrder, Order.getAddress_cardInfo,function(req,res){
    if(req.session.user){
        res.render('product/buy',{name:req.session.user.name, imageurl : req.session.imageurl, phone:req.session.user.phone, user_address:req.user_address, user_card:req.user_card, spd: req.spd});
    }
    else{
        res.send(`<script type="text/javascript">
        alert("로그인이 필요합니다"); 
        location.href='/users/sign_in';
        </script>`)
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