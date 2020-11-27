const multer = require('multer')

const pool = require('../dbconfig/dbconfig');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products/')
  },
  filename: function (req, file, cb) {
    console.log(Date.now() + '-' + file.originalname);
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
    storage: storage
  })

module.exports.send = (req, res, next) =>{
    upload.single('file')(req, res, ()=>{
        console.log('여긴 imgmulter ',req.file);

        next();
    })
}