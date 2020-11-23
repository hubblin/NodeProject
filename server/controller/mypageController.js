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

}

module.exports = MypageController;