const pool = require('../config/dbconfig');

class UserController{
    async signUp(req, res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            
            // 다 입력했는지 확인
            if(req.body.user_id && req.body.user_pw && req.body.user_name && req.body.user_phone){
                conn.query('select * from user where user_id = ?',[
                    req.body.user_id
                ], (err, id_result)=>{
                    if(err) throw err;


                    // 검색값 없을때만 즉 이미 없는 아이디일때만 
                    if(id_result.length == 0){
                        conn.query('insert into user values(?,?,?,?)',[
                            req.body.user_id, req.body.user_pw, req.body.user_name, req.body.user_phone
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

    async signIn(req,res,next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;

            // 입력한 정보 맞는지 확인
            if(req.body.user_id && req.body.user_pw){
                conn.query('select * from user where user_id = ? and user_pw = ?',[
                    req.body.user_id, req.body.user_pw
                ], (err, login_result)=>{
                    if(err) throw err;

                    if(login_result.length == 0){
                        req.check = false;
                        conn.release();
                        next();
                    }
                    else{
                        req.check = true;
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
}


module.exports = UserController;