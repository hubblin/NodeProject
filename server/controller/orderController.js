const pool = require('../dbconfig/dbconfig');

class OrderController {

    async getAddress_cardInfo(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('SELECT * FROM address where address.adr_user_id = ?', [
                req.session.user.id
            ], (err, user_address) => {
                if (err) throw err;

                req.user_address = user_address;
                conn.query('select * from card where card_user_id = ?', [
                    req.session.user.id
                ], (err, user_card) => {
                    if (err) throw err;

                    req.user_card = user_card;
                    conn.release();
                    next();
                })
            })

        })
    }

}

module.exports = OrderController