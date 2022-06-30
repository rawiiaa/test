const mysql = require('mysql2');

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mybase"
    // here you can set connection limits and so on
});

module.exports = connection;