const { dbConnection } = require('../../db');
const permissionEnum = require('../../enums/permissionEnum')

const getAdmin = async (user) => {
    const conn = await dbConnection();

    if(user === undefined) {
        return 'Something went wrong while searching for your user';
    }

    try {
        const sql = `SELECT U.CDUSER, NMUSER, PASSWORD FROM USERS U INNER JOIN USERPERMISSION UP ON UP.CDUSER = U.CDUSER INNER JOIN PERMISSION P ON P.CDPERMISSION = UP.CDPERMISSION WHERE EMAIL = ? AND PASSWORD = ? AND IDPERMISSION = ${permissionEnum.ADMIN};`
        const [userFound] = await conn.query(sql, [user.email, user.password]);

        return userFound;
    } catch (error) {
        console.log('User found is not an admin');
    }
    finally {
        await conn.end();
    }
}

module.exports = { getAdmin };