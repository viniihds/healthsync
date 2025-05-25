jest.mock('mysql2/promise');
const mysql = require('mysql2/promise');
const { dbConnection } = require('../db');

describe('dbConnection', () => {
    it('should call mysql.createConnection with correct config', async () => {
        const fakeConn = { fake: 'connection' };
        mysql.createConnection.mockResolvedValue(fakeConn);

        const conn = await dbConnection();

        expect(mysql.createConnection).toHaveBeenCalledWith({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'healthsync'
        });

        expect(conn).toEqual(fakeConn);
    });
});
