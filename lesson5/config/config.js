/**
 * Created by kalter on 8/14/2016.
 */
const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'tasks'
});
module.exports = pool;