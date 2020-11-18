var express = require('express');
var router = express.Router();

// 페인팅(파우치, 케이스, 의류)
router.get('/painting', function(req, res) {
    if(req.session.user){
        res.render('product/paintingProduct',{name:req.session.user.name});
    }
    else{
        res.render('product/paintingProduct',{name:false});
    }
});


// 페인팅 케이스
router.get('/painting/case', function(req, res) {
    if(req.session.user){
        res.render('product/paintingcase',{name:req.session.user.name});
    }
    else{
        res.render('product/paintingcase',{name:false});
    }
    
});

// 페인팅 옷
router.get('/painting/clothes', function(req, res) {
    if(req.session.user){
        res.render('product/paintingclothes',{name:req.session.user.name});
    }
    else{
        res.render('product/paintingclothes',{name:false});
    }
    
});


// 메이킹(키보드, 마우스, 이어폰)
router.get('/making', function(req,res, next){

    if(req.session.user){
        res.render('product/makingProduct',{name:req.session.user.name});
    }
    else{
        res.render('product/makingProduct',{name:false});
    }
});


// 메이킹 마우스
router.get('/making/mouse', function(req,res, next){
    if(req.session.user){
        res.render('product/makingmouse',{name:req.session.user.name});
    }
    else{
        res.render('product/makingmouse',{name:false});    
    }
    
});


// 메이킹 이어폰
router.get('/making/earphone', function(req,res, next){
    if(req.session.user){
        res.render('product/makingearphone',{name:req.session.user.name});
    }
    else{
        res.render('product/makingearphone',{name:false});
    }

});



module.exports = router;