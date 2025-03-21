const { dbConnection } = require("../../db");

const getUser = async (user) => {
    const connection = await dbConnection();

    try {
        const sql = 'SELECT CDUSER, NMUSER, PASSWORD FROM USER WHERE EMAIL = ? AND PASSWORD = ?;';
        const [userFound] = await connection.query(sql, [user.email, user.password]);

        return userFound;
    } finally {
        await connection.end();
    }
}

module.exports = { getUser };