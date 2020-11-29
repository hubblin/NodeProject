var express = require('express');
var router = express.Router();

const sellerController = require('../controller/sellerController');
const Seller = new sellerController();

const imageMulterController = require('../controller/imageMulterController');


router.get('/', function(req, res, next) {
    res.render('seller');
});

router.get('/upProduct',Seller.getCategoryInfo, function(req,res){
    res.render('sellers/up_product', {category:req.category_info});
})

router.post ('/upProduct',imageMulterController.send, Seller.addProduct,function(req,res){
    console.log(req.body);
    res.send(`<script type="text/javascript">
              alert("등록 성공"); 
                location.href='/seller';
          </script>`)
})

// 카테고리 상세 리스트 들고오기
router.post('/selectCategoryDetail', Seller.getCategoryDetail,function(req, res, next){
    res.json(req.cateDetail);

})
router.post('/more_detail_category', Seller.getDetailDetailCategoryInfo, function(req, res, next){
    res.json(req.detail_detail);
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