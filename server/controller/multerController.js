const multer = require('multer')

const pool = require('../dbconfig/dbconfig');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/review/')
  },
  filename: function (req, file, cb) {
    console.log(Date.now() + '-' + file.originalname);
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage
})

module.exports.send = (req, res, next) =>{
    upload.single("review_img")(req, res, ()=>{
        console.log(req.file, 'send');
        pool.getConnection((err, conn)=>{
            if(err) throw err;
    
            console.log(req.file);
    
            console.log(req.body.custom, req.body.painting)
            var customNum = Number(req.body.custom);
            var paintingNum = Number(req.body.painting);
    
            var nowTime = moment().format('YYYY-MM-DD');
    
            next();
    
            if(req.file){
                if(req.body.custom == 0){
                    conn.query('insert into product_review values(?,?,?,?,?,?,?)',[
                        null,paintingNum, req.session.user.id, req.body.give_score, req.body.review_text, nowTime, req.file.filename
                    ], (err)=>{
                        if(err) throw err;
    
                        conn.release();
                        next();
                    })
                }
                else{
                    conn.query('insert into product_review values(?,?,?,?,?,?,?)',[
                        null, customNum, req.session.user.id, req.body.give_score, req.body.review_text, nowTime, req.file.filename
                    ], (err)=>{
                        if(err) throw err;
    
                        conn.release();
                        next();
                    })
                }
            }
            else{
                if(req.body.custom == 0){
                    conn.query('insert into product_review values(?,?,?,?,?,?,?)',[
                        null, paintingNum, req.session.user.id, req.body.give_score, req.body.review_text, nowTime, 'none'
                    ], (err)=>{
                        if(err) throw err;
    
                        conn.release();
                        next();
                    })
                }
                else{
                    conn.query('insert into product_review values(?,?,?,?,?,?,?)',[
                        null, customNum, req.session.user.id, req.body.give_score, req.body.review_text, nowTime, 'none'
                    ], (err)=>{
                        if(err) throw err;
    
                        conn.release();
                        next();
                    })
                }
            }
            
        })
    })
    
}