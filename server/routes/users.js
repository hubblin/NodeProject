
var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const User = new userController();

/* GET users listing. */
// 회원가입 렌더링
router.get('/sign_up', function (req, res, next) {

  res.render('user/sign_up');
});

// 회원가입 post 
router.post('/sign_up',  User.signUp,function (req, res, next) {
  if (req.check) {
    res.send(`<script type="text/javascript">
            alert("회원가입 성공"); 
              location.href='/';
        </script>`)
  }
  else{
    res.send(`<script type="text/javascript">
            alert("회원가입 실패"); 
              location.href='/';
        </script>`)
  }
})

router.get('/sign_in', function (req, res, next) {

  res.render('user/sign_in');
});

router.post('/sign_in', User.signIn,function(req,res,next){
  if (req.check) {
    req.session.user = {
      id: req.body.user_id,
      name: req.info.user_name
    }
    res.send(`<script type="text/javascript">
            alert("로그인 성공"); 
              location.href='/';
        </script>`)
  }
  else{
    res.send(`<script type="text/javascript">
            alert("로그인 실패"); 
              location.href='/';
        </script>`)
  }
});

// 로그아웃
router.get('/sign_out', (req, res, next)=>{
  req.session.destroy();
  res.clearCookie('sid');

  res.send(`<script type="text/javascript">
            alert("로그아웃"); 
              location.href='/';
        </script>`)
})


module.exports = router;
