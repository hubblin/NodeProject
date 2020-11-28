var express = require('express');
var router = express.Router();

const mypageController = require('../controller/mypageController');
const Mypage = new mypageController();

const multerController = require('../controller/multerController');

// 마이페이지 메인화면 렌더링(페인팅 오더 목록)
router.get('/', Mypage.getOrderList,function (req, res, next) {
    res.render('mypage/mypage_main', {
        name: req.session.user.name, company:req.session.user.company_num, orderList:req.orderList, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    });
})

// 마이페이지 페인팅 오더 상세정보 렌더링
router.get('/detailOrder/:order_num', Mypage.getOrderDetail,function(req, res, next){
    res.render('mypage/mypage_order_detail',{
        name: req.session.user.name, company:req.session.user.company_num, orderDetail: req.orderDetail, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 커스텀 오더 목록 렌더링
router.get('/custom_order', Mypage.getCustomOrderList,function (req, res, next) {
    res.render('mypage/mypage_custom_order', {
        name: req.session.user.name, company:req.session.user.company_num, customOrderList: req.customOrderList,paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 커스텀 오더 상세정보 렌더링
router.get('/customOrder/detail/:custom_order_num', Mypage.getCustomDetail,function(req, res, next){
    res.render('mypage/mypage_custom_order_detail',{
        name: req.session.user.name, company:req.session.user.company_num, customInfo: req.customInfo, customDeatilInfo: req.customDeatilInfo,paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 사용자 카드 목록 렌더링
router.get('/myCard', Mypage.getCard,function (req, res, next) {
    res.render('mypage/mypage_myCard', {
        name: req.session.user.name,
        card:req.card, company:req.session.user.company_num, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 사용자 배송지목록 렌더링
router.get('/myAdr', Mypage.getAddress,function (req, res, next) {
    res.render('mypage/mypage_myAdress', {
        name: req.session.user.name,
        address: req.address, company:req.session.user.company_num, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 사용자가 적은 리뷰 목록 렌더링
router.get('/reviewList', Mypage.getMyReviewList,function (req, res, next) {
    res.render('mypage/mypage_reviewList', {
        name: req.session.user.name, company:req.session.user.company_num, myReviewList: req.myReviewList, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 주소 추가 페이지 렌더링
router.get('/addAdr', function (req, res, next) {
    res.render('mypage/add/mypage_Adress_add', {
        name: req.session.user.name, company:req.session.user.company_num, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 카드 추가 페이지 렌더링
router.get('/addCard', function(req, res, next){
    res.render('mypage/add/mypage_Card_add', {
        name: req.session.user.name, company:req.session.user.company_num, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 리뷰 추가 페이지 렌더링
router.get('/addReview', Mypage.getProductList,function(req, res, next){
    res.render('mypage/add/mypage_review_add', {
        name: req.session.user.name, company:req.session.user.company_num, custom_list: req.custom_product_list, product_list: req.product_list, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 카드 정보 수정 페이지 렌더링
router.get('/updateCard/:card_num', Mypage.getTagetCard,function(req, res, next){
    res.render('mypage/update/mypage_card_update', {
        name:req.session.user.name, company:req.session.user.company_num, card:req.tagetCard, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 마이페이지 배송지 정보 수정 페이지 렌더링
router.get('/updateAddress/:adr_UID', Mypage.getTagetAddress,function(req, res, next){
    res.render('mypage/update/mypage_address_update', {
        name:req.session.user.name, company:req.session.user.company_num, address:req.tagetAddress, paintingCount:req.session.user.paintingCount, customCount:req.session.user.customCount
    })
})

// 배송지 추가 post
router.post('/addAdr', Mypage.addAddress, function (req, res, next) {

    res.send(`<script type="text/javascript">
            alert("배송지 추가 성공"); 
            location.href='/mypage/myAdr';
            </script>`)
})

// 카드 추가 post
router.post('/addCard',Mypage.addCard,function(req,res,next){
    res.send(`<script type="text/javascript">
            alert("결제카드 추가 성공"); 
            location.href='/mypage/myCard';
            </script>`)
})

// 리뷰 추가 post
router.post('/addReview', multerController.send,function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("리뷰 추가 성공"); 
            location.href='/mypage/reviewList';
            </script>`)
})


// 카드 업데이트 post
router.post('/updateCard/:card_num', Mypage.updateCard,function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("카드 수정 성공"); 
            location.href='/mypage/myㅊㅁㄱ';
            </script>`)
})

// 배송지 업데이트 post
router.post('/updateAddress/:adr_uid', Mypage.updateAddress,function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("배송지 수정 성공"); 
            location.href='/mypage/myAdr';
            </script>`)
})

// 배송지 삭제 post
router.post('/deleteAddress/:adr_num', Mypage.deleteAddress,function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("배송지 삭제 성공"); 
            location.href='/mypage/myAdr';
            </script>`)
})

// 카드 삭제 post
router.post('/deleteCard/:card_num', Mypage.deleteCard,function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("결제카드 삭제 성공"); 
            location.href='/mypage/myCard';
            </script>`)
})

// 리뷰 삭제 post
router.post('/deleteReview/:review_num', Mypage.deleteMyReview,function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("리뷰 삭제 성공"); 
            location.href='/mypage/reviewList';
            </script>`)
})
module.exports = router;