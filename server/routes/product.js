var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/painting', function(req, res) {
    res.render('product/paintingProduct');
});

router.get('/painting/pouch', function(req, res) {
    res.render('product/paintingpouch');
});

router.get('/painting/case', function(req, res) {
    res.render('product/paintingcase');
});

router.get('/painting/clothes', function(req, res) {
    res.render('product/paintingclothes');
});

router.get('/making', function(req,res, next){
    res.render('product/makingProduct');
});



module.exports = router;