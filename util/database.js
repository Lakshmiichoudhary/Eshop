const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    users: 'root',
    database: 'node-complete',
    password: 'Lakshmi123..'
})

module.exports = pool.promise();