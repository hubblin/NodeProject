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

module.exports.send = (req, res, next) => {
    upload.single("review_img")(req, res, () => {
        console.log(req.file, 'send');
        pool.getConnection((err, conn) => {
            if (err) throw err;

            console.log(req.file);

            console.log(req.body.custom, req.body.painting)
            var customNum = Number(req.body.custom);
            var paintingNum = Number(req.body.painting);

            var nowTime = moment().format('YYYY-MM-DD');


            if (req.file) {

                conn.query('insert into product_review values(?,?,?,?,?,?,?)', [
                    null, paintingNum, req.session.user.id, req.body.give_score, req.body.review_text, nowTime, req.file.filename
                ], (err) => {
                    if (err) throw err;

                    conn.query('update product set product_review_score = (select avg(pro_score) from product_review where review_product_num = ?) where product_num = ?', [
                        paintingNum, paintingNum
                    ], (err) => {
                        if (err) throw err;
                        conn.release();
                        next();
                    })
                })

                // else{
                //     conn.query('insert into custom_order_review values(?,?,?,?,?,?,?)',[
                //         null, customNum, req.session.user.id, req.body.give_score, req.body.review_text, nowTime, req.file.filename
                //     ], (err)=>{
                //         if(err) throw err;

                //         conn.query('update custom_product set c_product_review_score = (select avg(review_score) from custom_order_review where review_c_product_num = 1) where c_product_num = 1',[
                //             paintingNum, paintingNum
                //         ], (err)=>{
                //             if(err) throw err;
                //             conn.release();
                //             next();
                //         })
                //     })
                // }
            } else {

                conn.query('insert into product_review values(?,?,?,?,?,?,?)', [
                    null, paintingNum, req.session.user.id, req.body.give_score, req.body.review_text, nowTime, 'none'
                ], (err) => {
                    if (err) throw err;

                    conn.release();
                    next();
                })

                // else{
                //     conn.query('insert into custom_order_review values(?,?,?,?,?,?,?)',[
                //         null, customNum, req.session.user.id, req.body.give_score, req.body.review_text, nowTime, 'none'
                //     ], (err)=>{
                //         if(err) throw err;

                //         conn.query('update custom_product set c_product_review_score = (select avg(review_score) from custom_order_review where review_c_product_num = 1) where c_product_num = 1',[
                //             paintingNum, paintingNum
                //         ], (err)=>{
                //             if(err) throw err;
                //             conn.release();
                //             next();
                //         })
                //     })
                // }
            }

        })
    })

}