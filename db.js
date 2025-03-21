const mysql = require('mysql2/promise');

const dbConnection = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'healthsync'
    });

    return connection;
}

module.exports = { dbConnection };
