const { dbConnection } = require("../../db");

const createUser = async user => {
    const conn = await dbConnection();
    const userExists = await checkIfExists(user.email, conn);

    if (userExists) {
        return `User with email: ${user.email} already exists`;
    }

    try {
        const sql = 'INSERT INTO USER (NMUSER, EMAIL, PASSWORD) VALUES (?, ?, ?);';
        const [newUser] = await conn.query(sql, [user.name, user.email, user.password]);

        return newUser;
    } catch (error) {
        console.error('Error while crating user, Error:', error);
        throw error;
    } finally {
        await conn.end();
    }
}

const checkIfExists = async (email, conn) => {
    const sql = 'SELECT 1 FROM USER WHERE EMAIL = ?'
    const [userFound] = await conn.query(sql, [email]);

    return userFound.length > 0;
}

module.exports = { createUser };