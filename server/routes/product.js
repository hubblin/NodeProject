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

router.get('/painting/case', function(req, res) {
    if(req.session.user){
        res.render('product/paintingcase',{name:req.session.user.name});
    }
    else{
        res.render('product/paintingcase',{name:false});
    }
    
});

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
        res.render('product/paintingProduct',{name:req.session.user.name});
    }
    else{
        res.render('product/paintingProduct',{name:false});
    }
});

router.get('/making/mouse', function(req,res, next){
    if(req.session.user){
        res.render('product/makingmouse',{name:req.session.user.name});
    }
    else{
        res.render('product/makingmouse',{name:false});    
    }
    
});

router.get('/making/earphone', function(req,res, next){
    if(req.session.user){
        res.render('product/makingearphone',{name:req.session.user.name});
    }
    else{
        res.render('product/makingearphone',{name:false});
    }

});



module.exports = router;