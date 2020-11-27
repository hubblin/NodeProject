var express = require('express');
var router = express.Router();

const sellerController = require('../controller/sellerController');
const Seller = new sellerController();

router.get('/', function(req, res, next) {
    res.render('seller');
});

router.get('/upProduct', function(req,res){
    res.render('sellers/up_product');
})

router.get('/checkProduct',Seller.getProductList , function(req,res){
    res.render('sellers/check_product', {p_list : req.p_num});
})

router.get('/order_check_product',function(req,res){
    res.render('sellers/order_check_product');
})

router.get('/order_product', function(req,res){
    res.render('sellers/order_product');
})

router.get('/detail/:product_num', Seller.getdetail , function(req,res){
    console.log(req.pd);
    res.render('sellers/detail_product', {pd : req.pd});
})
module.exports = router;