const pool = require('../dbconfig/dbconfig');

class ProductController {

    async getBagProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 1', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }

    //노트북이면서 15,14인치 구분
    async get15BagProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 1 And product_cate_d_d = 1 AND product_category_detail =3', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }

    
    async get14BagProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 1 And product_cate_d_d = 2 AND product_category_detail =3', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }
    //테블릿이면서 11인치 10인치 구분
    async get11BagProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 1 And product_cate_d_d = 3 AND product_category_detail =4', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }
    async get10BagProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 1 And product_cate_d_d = 4 AND product_category_detail =4', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }
    //
    async getCaseProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 2', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }


    //아이폰
    async get12CaseProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 2 And product_cate_d_d = 5 AND product_category_detail =1', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }
    async get11CaseProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 2 And product_cate_d_d = 6 AND product_category_detail =1', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }
    //갤럭시
    async get20CaseProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 2 And product_cate_d_d = 7 AND product_category_detail =2', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }
    async get10CaseProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 2 And product_cate_d_d = 8 AND product_category_detail =2', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }


    async getClothProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 3', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }

    //반팔 긴팔
    async getTshirtClothProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 3 And product_cate_d_d = 9 AND product_category_detail =5', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }
    async getShirtClothProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 3 And product_cate_d_d = 10 AND product_category_detail =5', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }
    //후드티
    async getHoodieClothProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 3 And product_cate_d_d = 11 AND product_category_detail =6', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }

    async getHood_zip_upClothProduct(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query('SELECT * FROM product WHERE product_category_num = 3 And product_cate_d_d = 12 AND product_category_detail =6', (err, row)=>{
                if(err) throw err;
                conn.release();
                req.products = row;
                next();
            })
        })
    }


}


module.exports = ProductController;