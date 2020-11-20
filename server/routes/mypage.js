var express = require('express');
var router = express.Router();

// 마이페이지 메인화면 렌더링(페인팅 오더 목록)
router.get('/', function(req, res, next){
    res.render('mypage/mypage_main',{name:req.session.user.name});
})

// 마이페이지 커스텀 오더 목록 렌더링
router.get('/custom_order', function(req, res, next){
    res.render('mypage/mypage_custom_order',{name:req.session.user.name})
})

// 마이페이지 사용자 카드 목록 렌더링
router.get('/myCard', function(req,res,next){
    res.render('mypage/mypage_myCard',{name:req.session.user.name})
})

// 마이페이지 사용자 배송지목록 렌더링
router.get('/myAdr', function(req,res,next){
    res.render('mypage/mypage_myAdress',{name:req.session.user.name})
})

router.get('/reviewList', function(req, res, next){
    res.render('mypage/mypage_reviewList',{name:req.session.user.name})
})
module.exports = router;