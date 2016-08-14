/**
 * Created by kalter on 8/14/2016.
 */
'use strict';
const pool = require('../config/config');
var Tasks = {
  list: function (callback) {
    const query = 'SELECT * FROM `tasks`';
    
  },
  add: function (task, callback) {
// TODO
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