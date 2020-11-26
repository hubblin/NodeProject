const pool = require('../dbconfig/dbconfig');

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
    async addCard(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('insert into card values(?,?,?,?,?)',[
                req.body.card_num, req.body.card_CVC, req.body.card_date, req.session.user.id, req.body.card_name
            ], (err)=>{
                if(err) throw err;

                conn.release();
                next();

            })

        })
    }

    // 배송지 삭제
    async deleteAddress(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('delete from address where adr_uid = ?',[
                req.params.adr_num
            ], (err)=>{
                if(err) throw err;

                conn.release();
                next();
            })
        })
    }

    // 카드 삭제
    async deleteCard(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('delete from card where card_num = ?',[
                req.params.card_num
            ], (err)=>{
                if(err) throw err;

                conn.release();
                next();
            })
        })
    }

    // 수정할 배송지 정보 가져오기
    async getTagetAddress(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('select * from address where adr_uid = ? ',[
                req.params.adr_UID
            ], (err, taget_address)=>{
                if(err) throw err;

                req.tagetAddress = taget_address;
                conn.release();
                next();

            })

        })
    }

    //수정할 카드정보 가져오기
    async getTagetCard(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('select * from card where card_num = ?',[
                req.params.card_num
            ], (err, taget_Card)=>{
                if(err) throw err;

                req.tagetCard = taget_Card;
                conn.release();
                next();
            })

        })
    }

    // 사용자의 배송지 목록 가져오기
    async getAddress(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('select * from address where adr_user_id = ?',[
                req.session.user.id
            ], (err, user_address)=>{
                if(err) throw err;

                req.address = user_address;
                conn.release();
                next();

            })
        })
    }

    // 사용자의 카드 목록 가져오기
    async getCard(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('select * from card where card_user_id = ?',[
                req.session.user.id
            ], (err, user_card)=>{
                if(err) throw err;

                req.card = user_card;
                conn.release();
                next();
            })
        })
    }

    // 마이페이지 페인팅 주문 목록에 띄어줄 주문목록 가져오기
    async getOrderList(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('select * from product_order where order_user_id = ?',[
                req.session.user.id
            ], (err, order_list)=>{
                if(err) throw err;

                req.orderList = order_list;
                conn.release();
                next();

            })
        })
    }

    // 마이페이지 자신이 적은 리뷰 가져오기
    async getMyReviewList(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('SELECT * FROM product_review, product where product_review.review_user_id = ? and review_product_num = product.product_num',[
                req.session.user.id
            ], (err, review_list)=>{
                if(err) throw err;

                req.myReviewList = review_list;
                conn.release();
                next();

            })
        })
    }

    // 선택한 리뷰 삭제
    async deleteMyReview(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('delete from product_review where review_num = ?',[
                req.params.review_num
            ], (err)=>{
                if(err) throw err;

                conn.release();
                next();
            })
        })
    }

}

module.exports = MypageController;