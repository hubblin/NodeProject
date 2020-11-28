const pool = require('../dbconfig/dbconfig');

const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/images/products');
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      }
    }),
});

//Seller.getProductList

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

    async addProduct(req,res,next){
        pool.getConnection((err,conn)=>{
            if(err) throw err;

            console.log('여긴 호균 컨트롤러 ',req.file);

            
            if(req.file){
                conn.query('insert into product values(?,?,?,?,?,?,?,?,?)',[
                    null, 3, req.body.product_name, req.body.product_price, req.body.product_stock, req.body.editor, req.file.filename, req.session.user.company_num, 0
                ], (err)=>{
                    if(err) throw err;
    
                    conn.release();
                    next();
                })
            }
            else{
                conn.query('insert into product values(?,?,?,?,?,?,?,?,?)',[
                    null, 3, req.body.product_name, req.body.product_price, req.body.product_stock, req.body.editor, 'none', req.session.user.company_num, 0
                ], (err)=>{
                    if(err) throw err;
    
                    conn.release();
                    next();
                })
            }
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