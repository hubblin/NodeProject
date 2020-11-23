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


module.exports = router;