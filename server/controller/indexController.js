const pool = require('../config/dbconfig')

class IndexController{

    async getUserInfo(req, res, next){
        pool.getConnection((err, conn) =>{
            if(err) throw err
            conn.query('select * from user', (err, row)=>{
                if(err) throw err;
                conn.release();

                console.log(row);
                next();
            })
        })
    }
}

module.exports = IndexController;