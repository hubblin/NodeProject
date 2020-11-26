const pool = require('../dbconfig/dbconfig');

const crypto = require('crypto');

let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

class UserController {

    // 사용자 회원가입
    async signUp(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            // 다 입력했는지 확인
            if (req.body.user_id && req.body.user_pw && req.body.user_name && req.body.user_phone) {

                let inputPassword = req.body.user_pw;

                let salt = Math.round((new Date().valueOf() * Math.random())) + "";
                let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

                var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

                conn.query('select * from user where user_id = ?', [
                    req.body.user_id
                ], (err, id_result) => {
                    if (err) throw err;


                    // 검색값 없을때만 즉 이미 없는 아이디일때만 
                    if (id_result.length == 0) {
                        conn.query('insert into user values(?,?,?,?,?,?)', [
                            req.body.user_id, hashPassword, req.body.user_name, req.body.user_phone, salt, nowTime
                        ], (err) => {
                            if (err) throw err;

                            req.check = true;
                            conn.release();
                            next();

                        })
                    } else {
                        req.check = false;
                        conn.release();
                        next();
                    }
                })
            } else {
                req.check = false;
                conn.release();
                next();
            }

        })
    }

    // 업체 회원가입
    async comSigUp(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            if(req.body.com_id && req.body.com_pw && req.body.com_name && req.body.com_phone && req.body.com_post_num && req.body.com_main_adr && req.body.com_detail_adr){
                
                let com_pw = req.body.com_pw;
                let salt = Math.round((new Date().valueOf() * Math.random())) + "";
                let hashPassword = crypto.createHash("sha512").update(com_pw + salt).digest("hex");
                var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

                // 승인된 업체 중 같은 아이디를 가지고 있는지 확인하기
                conn.query('select * from company where com_id = ? and approval_YN = ?',[
                    req.body.com_id, 'Y'
                ], (err, check_result)=>{
                    if(err) throw err;

                    // 확인 했을 때 결과값이 있으면 안되고 없으면 회원가입 진행함
                    if(check_result.length<=0){
                    
                        conn.query('insert into company values(?,?,?,?,?,?,?,?,?,?,?,?)',[
                            null, req.body.com_id, hashPassword, req.body.com_name, req.body.com_phone, req.body.com_post_num, req.body.com_main_adr, req.body.com_detail_adr, 0, 'N', nowTime,salt
                        ], (err)=>{
                            if(err) throw err;

                            req.sign_check = true;
                            conn.release();
                            next();
                        })
                    }
                    else{
                        req.sign_check = false;
                        conn.release();
                        next();
                    }
                })
            }
        })
    }

    // 로그인
    async signIn(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;
            req.company_check = false;
            // 입력한 정보 맞는지 확인
            if (req.body.user_id && req.body.user_pw) {
                let input_id = req.body.user_id;
                req.check = false;
                conn.query('select * from user where user_id = ?', [
                    input_id
                ], (err, login_result) => {
                    if (err) throw err;

                    console.log(login_result);

                    console.log(input_id);
                    if (login_result.length <= 0) {
                        conn.query(`select * from company where com_id =  ? and approval_YN = ?`,[
                            input_id, 'Y'
                        ]  ,(err, row)=>{
                            if(err) throw err;

                            console.log(input_id);
                            console.log(row);

                            if(row.length <= 0){
                                console.log('회사정보없음');
                                req.check = false;
                                conn.release();
                                next();
                            }
                            else{
                                let loginPassword = req.body.user_pw;

                                let salt4 = row[0].salt;
                                let nowHashPassword = crypto.createHash("sha512").update(loginPassword + salt4).digest("hex");

                                if(nowHashPassword == row[0].company_p_num){
                                    console.log('로그인성공');
                                    req.session.user = {
                                        id: req.body.user_id,
                                        name: row[0].com_name,
                                        phone: row[0].com_phone,
                                        company_num: row[0].company_num
                                    }
                                    req.check = true;
                                    req.company_check = true;
                                    conn.release();
                                    next();
                                }
                                else{
                                    console.log('입력정보 틀림');
                                    req.check = false;
                                    conn.release();
                                    next();
                                }
                            }
                        })
                    } else {
                        let loginPassword = req.body.user_pw;

                        let salt2 = login_result[0].salt;
                        let nowHashPassword = crypto.createHash("sha512").update(loginPassword + salt2).digest("hex");

                        console.log(nowHashPassword, login_result[0].user_pw);

                        if (nowHashPassword == login_result[0].user_pw) {
                            console.log('로그인성공');
                            req.session.user = {
                                id: req.body.user_id,
                                name: login_result[0].user_name,
                                phone: login_result[0].user_phone
                            }
                            req.check = true;
                            conn.release();
                            next();

                           
                        } else {

                            console.log('로그인실패1');
                            req.check = false;
                            conn.release();
                            next();
                        }
                    }
                })
            } else {
                console.log('로그인실패2');
                req.check = false;
                conn.release();
                next();
            }
        })
    }

    //카테고리 찾아오기
    async findCategory(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('select * from category', (err, category_result) => {
                if (err) throw err;

                req.category = category_result;
                conn.release();
                next();
            })
        })
    }
}


module.exports = UserController;