var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/painting', function(req, res) {
    res.render('product/paintingProduct');
});

router.get('/making', function(req,res, next){
    res.render('product/makingProduct');
});



module.exports = router;