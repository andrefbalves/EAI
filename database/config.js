var mysql = require('mysql2/promise');

var db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "eai_labs"
});

module.exports = db;