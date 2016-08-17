/**
 * Created by kalter on 8/14/2016.
 */
'use strict';
const config = require(__dirname + '/../config/config');
const mysql = config.mysql;
const pool = config.pool;
const Tasks = {
  list: function (callback) {
    const query = 'SELECT * FROM `tasks`';
    pool.getConnection((err, connection) => {
      connection.query(query, (err, rows) => {
        if (!err)
          return callback(null, rows);
        callback(err);
      });
    });
  },
  add: function (task, callback) {
    const query = 'INSERT INTO `tasks` (`id`,`name`,`text`,`complete`, `priority`)' +
      'VALUES (NULL, ??, ??, ?, ?)';
    const inserts = [task.name, task.text, 0, task.priority];
    pool.getConnection((err, conn) => {
      conn.query(mysql.format(query, inserts), (err, rows) => {
        if (!err)
          return callback(null, rows);
        callback(err);
      })
    });
  },
  change: function (id, text, callback) {
    // TODO
  },
  complete: function (id, callback) {
    // TODO
  },
  delete: function (id, callback) {
    // TODO
  }
};

module.exports = Tasks;