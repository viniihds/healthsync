const {dbConnection} = require('../db');
const permissionEnum = require('../enums/permissionEnum');

const userInfoSql = 'SELECT * FROM USERS WHERE CDUSER = ?;';

const checkIfExists = async (email, conn) => {
    const sql = 'SELECT 1 FROM USERS WHERE EMAIL = ?'
    const [userFound] = await conn.query(sql, [email]);

    return userFound.length > 0;
};

const getUser = async ({ email, password }) => {
    const connection = await dbConnection();

    if(email === undefined || password === undefined) {
        console.error('Email or password is undefined', password, email);
        return 'Something is wrong with your email or password';
    }

    try {
        const sql = 'SELECT * FROM USERS WHERE EMAIL = ? AND PASSWORD = ?';
        const [userFound] = await connection.query(sql, [email, password]);

        if (!userFound || userFound.length === 0) {
            return 'Email or Password is incorrect';
        }

        setGlobalUser(userFound.at());
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
        const [userInfo] = await conn.query(userInfoSql, [newUser.insertId]);

        await setUserPermission(newUser.insertId, permissionEnum.USER);

        setGlobalUser(userInfo.at());
    } catch (error) {
        console.error('Error while crating user, Error: ', error);
        return 'Error while creating user';
    } finally {
        await conn.end();
    }
};

const updateUser = async ({ email, name, password, cellphone }) => {
    const conn = await dbConnection();
    const cdUser = global.user.CDUSER;

    console.log('cellphone: ' + cellphone);
    if (!cdUser) {
        return 'Something went wrong while trying to update your data';
    }

    const sql = 'UPDATE USERS SET EMAIL = ?, NMUSER = ?, PASSWORD = ?, CELLPHONE = ? WHERE CDUSER = ?';

    try {
        await conn.query(sql, [email, name, password, cellphone, cdUser]);
        const [userInfo] = await conn.query(userInfoSql, [cdUser]);

        setGlobalUser(userInfo.at());
    } catch (error) {
        console.error('Error while updating user, Error: ', error);
        return 'Error while updating user';
    }
};

const setUserPermission = async (cdUser, permission) => {
    const conn = await dbConnection();

    try {
        const sql = 'INSERT INTO USERPERMISSION(CDUSER, CDPERMISSION) VALUES (?, ?)'
        await conn.query(sql, [parseInt(cdUser), permission]);
    } catch (error) {
        console.error('Error while setting permission, Error:', error);
    } finally {
        await conn.end();
    }
};

const setGlobalUser = (user) => {
    global.user = user;
};

module.exports = { createUser, getUser, updateUser };