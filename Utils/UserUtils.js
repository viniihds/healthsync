const {dbConnection} = require('../db');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require("./SessionUtils");

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
        const sql = 'SELECT CDUSER, NMUSER, PASSWORD FROM USERS WHERE EMAIL = ?';
        const [userFound] = await connection.query(sql, [email]);

        if (!userFound) {
            return;
        }

        const validPassword = await bcrypt.compare(password, userFound.at().PASSWORD);

        if (!validPassword) return 'Senha incorreta';

        return { userFound: userFound, token: jwt.sign({ id: email, username: userFound.NMUSER }, JWT_SECRET, { expiresIn: '1h' }) };
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO USERS (NMUSER, EMAIL, PASSWORD) VALUES (?, ?, ?);';
        const [newUser] = await conn.query(sql, [name, email, hashedPassword]);

        return newUser;
    } catch (error) {
        console.error('Error while crating user, Error:', error);
        throw error;
    } finally {
        await conn.end();
    }
}

module.exports = { createUser, getUser };