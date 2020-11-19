var express = require('express');
var router = express.Router();

const reviewController = require('../controller/reviewController');
const Review = new reviewController();


/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('review/review_main',{name:req.session.user.name,reviewList:req.reviewList});
    }
    else{
        res.render('review/review_main',{name:false,reviewList:req.reviewList});
    }
});


module.exports = router;