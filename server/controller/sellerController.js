const pool = require('../dbconfig/dbconfig');

class sellerController{
    async getProductList(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query(`select company_num from company where com_id = '${req.session.user.id}'`, (err, comp)=>{
                if(err) throw err;
                conn.query(`select product_num,product_name,product_price,product_stock,product_detail from product where product_company_num = '${comp[0].company_num}'`, (err, list)=>{
                    if(err) throw err;
                    conn.release();
                    req.p_num = list;
                    next();
                })
                
            })
        })
    }

    async getdetail(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query(`SELECT * FROM product WHERE product_num = "${req.params.product_num}"`, (err, prod)=>{
                if(err) throw err;
                conn.release();
                req.pd = prod;
                next();
            })
        })
    }
}

module.exports = sellerController;