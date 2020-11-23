const pool = require('../dbconfig/dbconfig');

const crypto = require('crypto');

let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

class UserController{

    // 사용자 회원가입
    async signUp(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            // 다 입력했는지 확인
            if(req.body.user_id && req.body.user_pw && req.body.user_name && req.body.user_phone){

                let inputPassword = req.body.user_pw;

                let salt = Math.round((new Date().valueOf() * Math.random())) + "";
                let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

                var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

                conn.query('select * from user where user_id = ?',[
                    req.body.user_id
                ], (err, id_result)=>{
                    if(err) throw err;


                    // 검색값 없을때만 즉 이미 없는 아이디일때만 
                    if(id_result.length == 0){
                        conn.query('insert into user values(?,?,?,?,?,?)',[
                            req.body.user_id, hashPassword, req.body.user_name, req.body.user_phone, salt, nowTime
                        ], (err)=>{
                            if(err) throw err;

                            req.check = true;
                            conn.release();
                            next();

                        })
                    }
                    else{
                        req.check = false;
                        conn.release();
                        next();
                    }
                })
            }
            else{
                req.check = false;
                conn.release();
                next();
            }

        })
    }

    // 사용자 로그인
    async signIn(req,res,next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            // 입력한 정보 맞는지 확인
            if(req.body.user_id && req.body.user_pw){
                req.check = false;
                conn.query('select * from user where user_id = ?',[
                    req.body.user_id
                ], (err, login_result)=>{
                    if(err) throw err;

                    if(login_result.length == 0){
                        req.check = false;
                        conn.release();
                        next();
                    }
                    else{
                        let loginPassword = req.body.user_pw;

                        let salt2 = login_result[0].salt;
                        let nowHashPassword = crypto.createHash("sha512").update(loginPassword + salt2).digest("hex");

                        console.log(nowHashPassword, login_result[0].user_pw);

                        if(nowHashPassword == login_result[0].user_pw){
                            console.log('로그인성공');

                            req.session.user = {
                                id: req.body.user_id,
                                name: login_result[0].user_name
                            }
                            req.check = true;
                            conn.release();
                            next();
                        }
                        else{

                            console.log('로그인실패1');
                            req.check = false;
                            conn.release();
                            next();
                        }
                    }
                })
            }
            else{
                console.log('로그인실패2');
                req.check = false;
                conn.release();
                next();
            }
        })
    }

    //카테고리 찾아오기
    async findCategory(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            conn.query('select * from category',(err, category_result)=>{
                if(err) throw err;

                req.category = category_result;
                conn.release();
                next();
            })
        })
    }
}


module.exports = UserController;