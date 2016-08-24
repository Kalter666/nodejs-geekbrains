/**
 * Created by kalter on 8/20/2016.
 */
const config = require(__dirname + '/../config/config');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const user = {
  select: (user, cb) => {
    const inserts = [user.name];
    const query = mysql.format('SELECT * FROM `users`',inserts);
    pool.getConnection((err, conn) => {
      if (err)
        return cb(err);
      conn.query(query, (err, rows) => {
        if (err)
          return cb(err);
        cb(null, rows);
      });
    });
  },
  add: (user, cb) => {
    const inserts = [user.name, user.password];
    const query = mysql.format('INSERT INTO `users` (`id`, `username`, `password`)' +
      'VALUES (NULL, ?, ?)', inserts);
    pool.getConnection( (err, conn) => {
      if (err)
        return cb(err);
      conn.query(query, (err, rows) => {
        if (err)
          return cb(err);
        cb(null, rows);
      })
    })
  },
  delete: (user, cb) => {
    const inserts = [user.name];
    const query = mysql.format('DELETE FROM `users` WHERE `username` = ?', inserts);
    pool.getConnection( (err, conn) => {
      if (err)
        return cb(err);
      conn.query(query, err => {
        if (err)
          return cb(err);
      })
    });
  }
};

module.exports = user;