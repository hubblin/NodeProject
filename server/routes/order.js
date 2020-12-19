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


//감사합니다. 화면
router.get('/finish', function(req,res){
    res.render('product/finish');
})

router.post('/order_buy', Order.SaveOrder, function(req, res, next){
    res.redirect('/order/buy_check/' + req.order_num);
})

//감사합니다 하기전에 구매 내역 안내 해주기
router.get('/buy_check/:order_num',Order.getOrder_data, function(req, res){
    console.log(req.prd)
    console.log(req.ord)
    res.render('product/buy_check', {name:req.session.user.name, order_data:req.ord, p_data: req.prd});
})

router.get('/:product_num',Order.getOrder,function(req,res){
    if(req.session.user){
        res.render('product/order',{name:req.session.user.name, spd: req.spd, spd_review: req.spd_review});
    }
    else{
        res.render('product/order',{name:false, spd:req.spd, spd_review: req.spd_review});
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