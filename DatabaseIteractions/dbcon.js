/*
**  eleyf
**  3/15/18
**  cs290 w2018
**  HW Assignment - DB Interactions and UI
*/

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_eleyf',
  password        : '4530',
  database        : 'cs290_eleyf',
  dateStrings	  : true
});

module.exports.pool = pool;
