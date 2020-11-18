const mysql = require('mysql');

var pool = mysql.createPool({
    host: 'nodeprojectdb.cwjgblhoizab.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'zkwpdlxm12',
    database: 'db'
})

module.exports = pool;