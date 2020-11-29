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

    // 확인안한 새로운 주문 목록 가져오기
    async getNewOrderList(req, res, next){
        pool.getConnection((err ,conn)=>{
            if(err) throw err;

            conn.query('select * from product_order, product where order_product_num in (select product_num from product where product_company_num = ?) and order_state = ? and product_order.order_product_num = product.product_num order by product_order.order_date desc',[
                req.session.user.company_num, '주문완료'
            ], (err, newOrderList)=>{
                if(err) throw err;

                req.newOrderList = newOrderList;
                conn.release();
                next();
            })
        })
    }

    // 업체 자신에게 들어온 주문 목록 전부 가져오기 최근 순서대로 정렬
    async getOrderListCompany(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('select * from product_order, product where order_product_num in (select product_num from product where product_company_num = ?) and product_order.order_product_num = product.product_num order by product_order.order_date desc',[
                req.session.user.company_num
            ],
            (err, company_orderList)=>{
                if(err) throw err;

                req.company_orderList = company_orderList;

                conn.release();
                next();
            })
        })
    }

    // 주문 확인하는거
    async updateOrderCheck(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('update product_order set order_state = ? where order_num = ?',[
                 '상품준비중',req.body.orderNum
            ], (err)=>{
                if(err) throw err;
                
                req.checkResult = 'ok'
                conn.release();
                next();
            })
        })
    }

    // 상세주문 정보 가져오기
    async getDetailOrder(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('select * from product_order, product where order_num = ? and product_order.order_product_num = product.product_num',[
                req.params.orderNum
            ], (err, order_detail_com)=>{
                if(err) throw err;

                req.order_detail_com = order_detail_com;
                conn.release();
                next();
            })
        })
    }

    // 카테고리 정보 가져오기
    async getCategoryInfo(req, res, next){
        pool.getConnection((err, conn)=>{
            conn.query('select * from category where custom_YN = ?',[
                'N'
            ],(err, category_info)=>{
                if(err) throw err;
                
                req.category_info = category_info;
                conn.release();
                next();
            })
        })
    }

    // 카테고리 상세 정보 가져오기
    async getCategoryDetail(req, res, next){
        pool.getConnection((err, conn)=>{
            conn.query('select * from category_detail_list where cate_category_num =?',[
                req.body.category_num
            ], (err, cateDetail)=>{
                if(err) throw err;

                req.cateDetail = cateDetail;
                conn.release();
                next();
            })
        })
    }
    async getDetailDetailCategoryInfo(req, res, next){
        pool.getConnection((err, conn)=>{
            conn.query('select * from cate_detail_detail_list where fk_detail_list_num = ?',[
                req.body.cate_category_num
            ], (err, detail_detail)=>{
                if(err) throw err;

                req.detail_detail = detail_detail;
                conn.release();
                next();
            })
        })
    }

    // 주문상태변경
    async updateOrderState(req, res, next){
        pool.getConnection((err, conn)=>{
            conn.query('update product_order set order_state = ? where order_num = ?',[
                req.body.state, req.body.orderNum
            ], (err)=>{
                if(err) throw err;

                req.updateOrderState = 'ok';
                conn.release();
                next();
            })
        })
    }
    
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
                conn.query('insert into product values(?,?,?,?,?,?,?,?,?,?,?)',[
                    null, req.body.category, req.body.category_detail, req.body.category_detail_detail, req.body.product_name, req.body.product_price, req.body.product_stock, req.body.editor, req.file.filename, req.session.user.company_num, 0
                ], (err)=>{
                    if(err) throw err;
    
                    conn.release();
                    next();
                })
            }
            else{
                conn.query('insert into product values(?,?,?,?,?,?,?,?,?,?,?)',[
                    null,req.body.category, req.body.category_detail, req.body.category_detail_detail, req.body.product_name, req.body.product_price, req.body.product_stock, req.body.editor, 'none', req.session.user.company_num, 0
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