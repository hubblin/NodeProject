const pool = require('../dbconfig/dbconfig');

class ReviewController{

    async getReviewList(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            // 리뷰 리스트 전부 가져오기
            conn.query('SELECT * FROM product, product_review where product_review.review_product_num = product.product_num order by 6', (err, review_list)=>{
                if(err) throw err;

                req.reviewList = review_list;
                conn.release();
                next();
            })
        })
    }

}


module.exports = ReviewController;