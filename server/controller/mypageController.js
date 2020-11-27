const pool = require('../dbconfig/dbconfig');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

class MypageController {



    //  배송지 추가 
    async addAddress(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('insert into address values(?,?,?,?,?,?,?,?)', [
                null, req.body.post_num, req.body.main_adr, req.body.detail_adr, req.session.user.id, req.body.user_name, req.body.user_phone, req.body.adr_name
            ], (err) => {
                if (err) throw err;

                conn.release();
                next();
            })
        })
    }

    // 카드 추가
    async addCard(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('insert into card values(?,?,?,?,?)', [
                req.body.card_num, req.body.card_CVC, req.body.card_date, req.session.user.id, req.body.card_name
            ], (err) => {
                if (err) throw err;

                conn.release();
                next();

            })

        })
    }

    // 배송지 삭제
    async deleteAddress(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('delete from address where adr_uid = ?', [
                req.params.adr_num
            ], (err) => {
                if (err) throw err;

                conn.release();
                next();
            })
        })
    }

    // 카드 삭제
    async deleteCard(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('delete from card where card_num = ?', [
                req.params.card_num
            ], (err) => {
                if (err) throw err;

                conn.release();
                next();
            })
        })
    }

    // 수정할 배송지 정보 가져오기
    async getTagetAddress(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('select * from address where adr_uid = ? ', [
                req.params.adr_UID
            ], (err, taget_address) => {
                if (err) throw err;

                req.tagetAddress = taget_address;
                conn.release();
                next();

            })

        })
    }

    //수정할 카드정보 가져오기
    async getTagetCard(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('select * from card where card_num = ?', [
                req.params.card_num
            ], (err, taget_Card) => {
                if (err) throw err;

                req.tagetCard = taget_Card;
                conn.release();
                next();
            })

        })
    }

    // 카드 수정
    async updateCard(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('update card set card_num = ? , card_CVC = ?, card_date = ?, card_name = ? where card_num = ?', [
                req.body.card_num, req.body.card_CVC, req.body.card_date, req.body.card_name, req.params.card_num
            ], (err) => {
                if (err) throw err;
                conn.release();
                next();
            })
        })
    }

    // 배송지 수정
    async updateAddress(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;



            conn.query('update address set adr_post_num = ?, adr_main = ?, adr_detail = ?, adr_get_user_name = ?, adr_user_phone = ?, adr_name = ? where adr_uid = ?', [
                req.body.post_num, req.body.main_adr, req.body.detail_adr, req.body.user_name, req.body.user_phone, req.body.user_phone, req.body.adr_name, req.params.adr_UID
            ], (err) => {
                if (err) throw err;
                conn.release();
                next();
            })
        })
    }



    // 사용자의 배송지 목록 가져오기
    async getAddress(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('select * from address where adr_user_id = ?', [
                req.session.user.id
            ], (err, user_address) => {
                if (err) throw err;

                req.address = user_address;
                conn.release();
                next();

            })
        })
    }

    // 사용자의 카드 목록 가져오기
    async getCard(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('select * from card where card_user_id = ?', [
                req.session.user.id
            ], (err, user_card) => {
                if (err) throw err;

                req.card = user_card;
                conn.release();
                next();
            })
        })
    }

    // 마이페이지 페인팅 주문 목록에 띄어줄 주문목록 가져오기
    async getOrderList(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('select * from product_order, product where order_user_id = ? and product_order.order_product_num = product.product_num', [
                req.session.user.id
            ], (err, order_list) => {
                if (err) throw err;

                conn.query('select count(*) as order_count from product_order where not order_state = ? and order_user_id = ?;', [
                    '배송완료', req.session.user.id
                ], (err, order_count) => {
                    if (err) throw err;

                    conn.query('SELECT count(*) as custom_order_count from custom_order where not c_order_state = ? and custom_order.user_user_id = ?;', [
                        '배송완료', req.session.user.id
                    ], (err, custom_order_count) => {
                        if (err) throw err;

                        req.session.user.paintingCount = order_count[0].order_count
                        req.session.user.customCount = custom_order_count[0].custom_order_count

                        req.orderList = order_list;
                        conn.release();
                        next();
                    })
                })

            })
        })
    }

    // 마이페이지 자신이 적은 리뷰 가져오기
    async getMyReviewList(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('SELECT * FROM product_review, product where product_review.review_user_id = ? and review_product_num = product.product_num', [
                req.session.user.id
            ], (err, review_list) => {
                if (err) throw err;

                req.myReviewList = review_list;
                conn.release();
                next();

            })
        })
    }

    // 리뷰적을때 자신이 주문한 상품에 리뷰를 적지 않은 것 가져오기
    async getProductList(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('select * from product where product_num in (select order_product_num from product_order where not order_product_num in (select review_product_num from product_review where review_user_id = ?))', [
                req.session.user.id
            ], (err, product_list) => {
                if (err) throw err;

                conn.query('select * from custom_product', (err, custom_product_list) => {
                    if (err) throw err;

                    req.custom_product_list = custom_product_list;
                    req.product_list = product_list;
                    conn.release();
                    next();

                })
            })
        })
    }

    // 선택한 리뷰 삭제
    async deleteMyReview(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('delete from product_review where review_num = ?', [
                req.params.review_num
            ], (err) => {
                if (err) throw err;

                conn.release();
                next();
            })
        })
    }

}

module.exports = MypageController;