var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');


//라우트 추가되면 여기에 넣기
var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var productRouter = require('./server/routes/product');
var reviewRouter = require('./server/routes/review');
var orderRouter = require('./server/routes/order');
var mypageRouter = require('./server/routes/mypage');
var companyRouter = require('./server/routes/company');
var sellerRouter = require('./server/routes/seller');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({
  limit: "1gb"
}));
app.use(express.urlencoded({ 
  limit: "1gb",
  extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  key:'sid',
  secret:'secret',
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:24000*60*60
  }
}));

//여기가 router 설치
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter);
app.use('/order', orderRouter);
app.use('/mypage', mypageRouter);
app.use('/company', companyRouter);
app.use('/seller', sellerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
