const pool = require('../dbconfig/dbconfig');

class IndexController {

    // 메인화면에 보여줄 꺼
    async getInfo_main(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            // 리뷰 최근 꺼 3개 가져오기

            conn.query('SELECT * FROM product, product_review where product_review.review_product_num = product.product_num order by pro_review_date desc  limit 3', (err, review_list_main) => {
                if (err) throw err;

                req.review_main = review_list_main;
                conn.release();
                next();
            })
        })
    }
}

module.exports = IndexController;