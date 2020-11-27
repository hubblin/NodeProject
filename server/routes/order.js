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

//여기 거쳐서
router.post('/temp_buy', function(req,res){
    // req.session.imageurl = req.body.imageurl;
    // res.redirect('/order/buy');

    if(req.session.user){
        console.log('로그인 함');
        req.session.imageurl = req.body.imageurl;
        res.redirect('/order/buy');
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
router.get('/buy', Order.getAddress_cardInfo,function(req,res){
    if(req.session.user){
        res.render('product/buy',{name:req.session.user.name, imageurl : req.session.imageurl, phone:req.session.user.phone, user_address:req.user_address, user_card:req.user_card});
    }
    else{
        res.send(`<script type="text/javascript">
        alert("로그인이 필요합니다"); 
        location.href='/users/sign_in';
        </script>`)
    }

})

router.post('/order_buy', function(req, res, next){
    console.log('주문성공');
    res.redirect('/order/finish');
})



router.get('/makingbuy', function(req,res){

    if(req.session.user){
        res.render('product/makingbuy',{name:req.session.user.name, imageurl : req.session.imageurl});
    }
    else{
        res.render('product/makingbuy',{name:false,imageurl : req.session.imageurl});
    }

})



router.get('/finish', function(req,res){
    res.render('product/finish');
})


module.exports = router;