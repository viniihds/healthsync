const {dbConnection} = require('../db');

const checkIfExists = async (email, conn) => {
    const sql = 'SELECT 1 FROM USERS WHERE EMAIL = ?'
    const [userFound] = await conn.query(sql, [email]);

    return userFound.length > 0;
}

const getUser = async ({ email, password }) => {
    const connection = await dbConnection();

    if(email === undefined || password === undefined) {
        return 'Something went wrong while searching for your user';
    }

    try {
        const sql = 'SELECT CDUSER, NMUSER, PASSWORD FROM USERS WHERE EMAIL = ? AND PASSWORD = ?';
        const [userFound] = await connection.query(sql, [email, password]);

        return userFound;
    } finally {
        await connection.end();
    }
}

const createUser = async ({ email, name, password }) => {
    const conn = await dbConnection();
    const userExists = await checkIfExists(email, conn);

    if (userExists) {
        return `User with email: ${email} already exists`;
    }

    try {
        const sql = 'INSERT INTO USERS (NMUSER, EMAIL, PASSWORD, CELLPHONE) VALUES (?, ?, ?, NULL);';
        const [newUser] = await conn.query(sql, [name, email, password]);

        return newUser;
    } catch (error) {
        console.error('Error while crating user, Error:', error);
        throw error;
    } finally {
        await conn.end();
    }
}

module.exports = { createUser, getUser };