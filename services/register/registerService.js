const { dbConnection } = require("../../db");

const createUser = async user => {
    const connection = await dbConnection();
    const userExists = await checkIfExists(user);

    if (userExists) {
        return false;
    }

    try {
        const sql = 'INSERT INTO USER (NMUSER, EMAIL, PASSWORD) VALUES (?, ?, ?);';
        const [newUser] = await connection.query(sql, [user.name, user.email, user.password]);

        return newUser ?? false;
    } finally {
        await connection.end();
    }
}

const checkIfExists = async (user) => {
    const connection = await dbConnection();

    try {
        const sql = 'SELECT 1 FROM USER WHERE EMAIL = ?'
        const [userFound] = await connection.query(sql, [email]);

        return userFound.length > 0;
    } finally {
        connection.end()
    }
}

module.exports = { createUser };