var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/painting', function(req, res) {
    if(req.session.user){
        res.render('product/paintingProduct',{name:req.session.user.name});
    }
    else{
        res.render('product/paintingProduct',{name:false});
    }
});

router.get('/making', function(req,res, next){
    if(req.session.user){
        res.render('product/makingProduct',{name:req.session.user.name});
    }
    else{
        res.render('product/makingProduct',{name:false});
    }
});



module.exports = router;