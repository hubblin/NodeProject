var express = require('express');
var router = express.Router();

const sellerController = require('../controller/sellerController');
const Seller = new sellerController();

const imageMulterController = require('../controller/imageMulterController');

// 업체 메인페이지 렌더링
router.get('/', Seller.getNewOrderList,function(req, res, next) {
    res.render('seller',{newOrderList: req.newOrderList});
});


router.post('/checkOrder',Seller.updateOrderCheck, function(req, res, next){
    
    var checkResult = {'result':req.checkResult};

    res.json(checkResult);
})

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

// 세부카테고리 가져오기
router.post('/more_detail_category', Seller.getDetailDetailCategoryInfo, function(req, res, next){
    res.json(req.detail_detail);
})

router.post('/updateOrderState',Seller.updateOrderState, function(req, res, next){
    var state = {'result':req.updateOrderState};

    res.send(state);
} )

router.get('/checkProduct',Seller.getProductList , function(req,res){
    res.render('sellers/check_product', {p_list : req.p_num});
})

router.get('/order_check_product', Seller.getOrderListCompany,function(req,res){
    res.render('sellers/order_check_product', {orderList: req.company_orderList});
})

// 주문 상세정보 렌더링 
router.get('/order_product/:orderNum',Seller.getDetailOrder, function(req,res){
    res.render('sellers/order_product_detail', {order_detail_com: req.order_detail_com});
})

router.get('/detail/:product_num', Seller.getdetail , function(req,res){
    console.log(req.pd);
    res.render('sellers/detail_product', {pd : req.pd});
})
module.exports = router;