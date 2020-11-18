const pool = require('../dbconfig/dbconfig');

class IndexController{

    async getInfo_main(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            // 리뷰 최근 꺼 3개 가져오기
            conn.query('SELECT * FROM product_review, product where product_product_num = product_num order by 6 desc limit 3', (err, review_list_main)=>{
                if(err) throw err;

                req.review_main = review_list_main;
                conn.release();
                next();
            })
        })
    }
}

module.exports = IndexController;