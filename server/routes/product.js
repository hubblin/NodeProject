var express = require('express');
var router = express.Router();

const productController = require('../controller/productController');
const Product = new productController();


// 페인팅(파우치, 케이스, 의류)
router.get('/painting',Product.getBagProduct, function(req, res) {
    if(req.session.user){
        console.log(req.products);
        res.render('product/paintingProduct',{name:req.session.user.name, bagProduct: req.products});
    }
    else{
        res.render('product/paintingProduct',{name:false, bagProduct: req.products});
    }
});

router.get('/15inchpainting',Product.get15BagProduct, function(req, res) {
    if(req.session.user){
        console.log(req.products);
        res.render('product/15inchpaintingProduct',{name:req.session.user.name, bagProduct: req.products});
    }
    else{
        res.render('product/15inchpaintingProduct',{name:false, bagProduct: req.products});
    }
});

router.get('/14inchpainting',Product.get14BagProduct, function(req, res) {
    if(req.session.user){
        console.log(req.products);
        res.render('product/14inchpaintingProduct',{name:req.session.user.name, bagProduct: req.products});
    }
    else{
        res.render('product/14inchpaintingProduct',{name:false, bagProduct: req.products});
    }
});

router.get('/11inchpainting',Product.get11BagProduct, function(req, res) {
    if(req.session.user){
        console.log(req.products);
        res.render('product/11inchpaintingProduct',{name:req.session.user.name, bagProduct: req.products});
    }
    else{
        res.render('product/11inchpaintingProduct',{name:false, bagProduct: req.products});
    }
});

router.get('/10inchpainting',Product.get10BagProduct, function(req, res) {
    if(req.session.user){
        console.log(req.products);
        res.render('product/10inchpaintingProduct',{name:req.session.user.name, bagProduct: req.products});
    }
    else{
        res.render('product/10inchpaintingProduct',{name:false, bagProduct: req.products});
    }
});


// 페인팅 케이스
router.get('/painting/case',Product.getCaseProduct, function(req, res) {
    if(req.session.user){
        res.render('product/paintingcase',{name:req.session.user.name, caseProduct: req.products});
    }
    else{
        res.render('product/paintingcase',{name:false, caseProduct: req.products});
    }
});

//페인팅 아이폰 케이스
router.get('/painting/iphone12case',Product.get12CaseProduct, function(req, res) {
    if(req.session.user){
        res.render('product/iphone12PaintingProduct',{name:req.session.user.name, caseProduct: req.products});
    }
    else{
        res.render('product/iphone12PaintingProduct',{name:false, caseProduct: req.products});
    }
});

router.get('/painting/iphone11case',Product.get11CaseProduct, function(req, res) {
    if(req.session.user){
        res.render('product/iphone11PaintingProduct',{name:req.session.user.name, caseProduct: req.products});
    }
    else{
        res.render('product/iphone11PaintingProduct',{name:false, caseProduct: req.products});
    }
});

// 페인팅 갤럭시 케이스
router.get('/painting/galaxy20case',Product.get20CaseProduct, function(req, res) {
    if(req.session.user){
        res.render('product/galaxy20PaintingProduct',{name:req.session.user.name, caseProduct: req.products});
    }
    else{
        res.render('product/galaxy20PaintingProduct',{name:false, caseProduct: req.products});
    }
});

router.get('/painting/galaxy10case',Product.get10CaseProduct, function(req, res) {
    if(req.session.user){
        res.render('product/galaxy10PaintingProduct',{name:req.session.user.name, caseProduct: req.products});
    }
    else{
        res.render('product/galaxy10PaintingProduct',{name:false, caseProduct: req.products});
    }
});
//

// 페인팅 옷
router.get('/painting/clothes',Product.getClothProduct, function(req, res) {
    if(req.session.user){
        res.render('product/paintingclothes',{name:req.session.user.name, clothProduct: req.products});
    }
    else{
        res.render('product/paintingclothes',{name:false, clothProduct: req.products});
    }
    
});


//페인팅 옷 반팔/ 긴팔
router.get('/painting/tshirt',Product.getTshirtClothProduct, function(req, res) {
    if(req.session.user){
        res.render('product/tshirtpaintingProduct',{name:req.session.user.name, clothProduct: req.products});
    }
    else{
        res.render('product/tshirtpaintingProduct',{name:false, clothProduct: req.products});
    }
    
});

router.get('/painting/shirt',Product.getShirtClothProduct, function(req, res) {
    if(req.session.user){
        res.render('product/shirtpaintingProduct',{name:req.session.user.name, clothProduct: req.products});
    }
    else{
        res.render('product/shirtpaintingProduct',{name:false, clothProduct: req.products});
    }
    
});

//페인팅 옷 후드집업
router.get('/painting/hoodie',Product.getHoodieClothProduct, function(req, res) {
    if(req.session.user){
        res.render('product/hoodiepaintingProduct',{name:req.session.user.name, clothProduct: req.products});
    }
    else{
        res.render('product/hoodiepaintingProduct',{name:false, clothProduct: req.products});
    }
    
});

router.get('/painting/hood_zip_up',Product.getHood_zip_upClothProduct, function(req, res) {
    if(req.session.user){
        res.render('product/hood_zip_uppaintingProduct',{name:req.session.user.name, clothProduct: req.products});
    }
    else{
        res.render('product/hood_zip_uppaintingProduct',{name:false, clothProduct: req.products});
    }
    
});
//


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