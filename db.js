const mysql = require('mysql2/promise');

const dbConnection = () => mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'healthsync'
});

module.exports = { dbConnection };