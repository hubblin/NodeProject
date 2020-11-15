var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    if(req.session.user){
        res.render('review/review_main',{name:req.session.user.name});
    }
    else{
        res.render('review/review_main',{name:false});
    }
});


module.exports = router;