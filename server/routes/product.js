var express = require('express');
var router = express.Router();

// 페인팅(파우치, 케이스, 의류)
router.get('/painting', function(req, res) {
    res.render('product/paintingProduct');
});

router.get('/painting/case', function(req, res) {
    res.render('product/paintingcase');
});

router.get('/painting/clothes', function(req, res) {
    res.render('product/paintingclothes');
});


// 메이킹(키보드, 마우스, 이어폰)
router.get('/making', function(req,res, next){
    res.render('product/makingProduct');
});

router.get('/making/mouse', function(req,res, next){
    res.render('product/makingmouse');
});

router.get('/making/earphone', function(req,res, next){
    res.render('product/makingearphone');
});



module.exports = router;