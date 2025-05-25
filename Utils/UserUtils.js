const {dbConnection} = require('../db');
const permissionEnum = require('../enums/permissionEnum');

const checkIfExists = async (email, conn) => {
    const sql = 'SELECT 1 FROM USERS WHERE EMAIL = ?'
    const [userFound] = await conn.query(sql, [email]);

    return userFound.length > 0;
};

const getUser = async ({ email, password }) => {
    const connection = await dbConnection();

    if(email === undefined || password === undefined) {
        console.error('email or password is undefined', password, email);
        return 'Something is wrong with your email or password';
    }

    try {
        const sql = 'SELECT CDUSER, NMUSER, EMAIL, PASSWORD FROM USERS WHERE EMAIL = ? AND PASSWORD = ?';
        const [userFound] = await connection.query(sql, [email, password]);

        if (!userFound) {
            return 'Email or Password is incorrect';
        }

        console.log('user found', userFound.length);

        return userFound.at();
    } catch (error) {
        console.error('Error while trying to search your user. Error: ', error);
        return 'Error while trying to search your user.';
    } finally {
        await connection.end();
    }
};

const createUser = async ({ email, name, password }) => {
    const conn = await dbConnection();
    const userExists = await checkIfExists(email, conn);

    if (userExists) {
        return `User with email: ${email} already exists`;
    }

    try {
        const sql = 'INSERT INTO USERS (NMUSER, EMAIL, PASSWORD) VALUES (?, ?, ?);';
        const [newUser] = await conn.query(sql, [name, email, password]);
        const userInfoSql = 'SELECT * FROM USERS WHERE CDUSER = ?;';
        const [userInfo] = await conn.query(userInfoSql, [newUser.insertId]);

        await setUserPermission(email, password, permissionEnum.USER);

        return userInfo;
    } catch (error) {
        console.error('Error while crating user, Error: ', error);
        return 'Error while creating user';
    } finally {
        await conn.end();
    }
};

const updateUser = async ({ cduser, email, name, password, cellphone }) => {
    const conn = await dbConnection();

    if (!cduser) {
        return 'Something went wrong while trying to update your data';
    }

    const sql = 'UPDATE USERS SET EMAIL = ?, NMUSER = ?, PASSWORD = ?, CELLPHONE = ? WHERE CDUSER = ?';

    try {
        conn.query(sql, [email, name, password, cellphone]);
    } catch (error) {
        console.error('Error while updating user, Error: ', error);
        return 'Error while updating user';
    }
};

const setUserPermission = async (email, password, permission) => {
    const conn = await dbConnection();

    try {
        const cduser = await getCdUser(email, password);

        const sql = 'INSERT INTO USERPERMISSION(CDUSER, CDPERMISSION) VALUES (?, ?)'
        await conn.query(sql, [cduser, permission]);
    } catch (error) {
        console.error('Error while setting admin permission, Error:', error);
    } finally {
        await conn.end()
    }
}

const getCdUser = async ( email, password ) => {
    const conn = await dbConnection();

    try {
        const sql = 'SELECT CDUSER FROM USERS WHERE EMAIL = ? AND PASSWORD = ?;'
        const [user] = await conn.query(sql, [email, password]);

        return user[0].CDUSER;
    } catch (error) {
        console.error('Error while getting cduser, Error:', error);
    } finally {
        await conn.end()
    }
}

module.exports = { createUser, getUser };