/**
 * Created by kalter on 8/14/2016.
 */
const mysql = {
  mysql: require('mysql'),
  pool: this.mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasks'
  })
};
module.exports = mysql;