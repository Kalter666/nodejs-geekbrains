/**
 * Created by kalter on 8/14/2016.
 */
'use strict';
const config = require(__dirname + '/../config/config');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const Tasks = {
  list: callback => {
    const query = 'SELECT * FROM `tasks`';
    pool.getConnection((err, connection) => {
      connection.query(query, (err, rows) => {
        if (!err)
          return callback(null, rows);
        callback(err);
      });
    });
  },
  add: (task, callback) => {
    const query = 'INSERT INTO `tasks` (`id`,`name`,`text`,`complete`, `priority`)' +
      'VALUES (NULL, ?, ?, ?, ?)';
    const inserts = [task.name, task.text, 0, task.priority];
    pool.getConnection((err, conn) => {
      conn.query(mysql.format(query, inserts), (err) => {
        if (!err)
          return callback(null);
        callback(err);
      })
    });
  },
  change: (task, callback) => {
    const inserts = [task.id, task.name, task.text, task.priority];
    const query = mysql.format('UPDATE `tasks` WHERE `id` = ? SET `name` = ?,' +
      '`text` = ?, `complete` = ?, `priority` = ?', inserts);
    pool.getConnection((err, conn) => {
      conn.query(query, (err, res) =>{
        if (err)
          return callback(err);
        callback(null, res);
      });
    });
  },
  complete: (task, callback) => {
    const inserts = [task.id];
    const query = mysql.format('UPDATE `tasks` WHERE `id` = ? SET `complete` = 1', inserts);
    pool.getConnection( (err, conn) => {
      conn.query(query, err => {
        if (err){
          return callback(err);
        }
        callback(null);
      });
    })
  },
  delete: (task, callback) => {
    const inserts = [task.id];
    const query = mysql.format('DELETE FROM `tasks` WHERE `id` = ?', inserts);
    pool.getConnection( (err, conn) => {
      conn.query(query, err => {
        if (err){
          return callback(err);
        }
        callback(null);
      });
    })
  }
};

module.exports = Tasks;