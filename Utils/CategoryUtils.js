const { dbConnection } = require("../db");

const getAllCategories = async() => {
    const conn = await dbConnection();
    const sql = 'SELECT cdcategory, nmcategory FROM CATEGORY';

    try {
        const [result] = await conn.query(sql);
        const categories = [];

        console.log('categories: ' + JSON.stringify(result, null, 2));

        result.forEach(cat => {
            categories.push(cat);
        })

        return categories;
    } catch (error) {
        console.error(error);
    }
};

const createCategory = async cat => {
    const conn = await dbConnection();
    const sql = parseInt(cat.cdcategory) !== -1
        ? `UPDATE CATEGORY SET NMCATEGORY = ? WHERE CDCATEGORY = ${cat.cdcategory}`
        : 'INSERT INTO CATEGORY (NMCATEGORY) VALUES(?)';

    try {
        await conn.query(sql, [cat.nmcategory]);
    } catch (Error) {
        console.error('Error: ', Error);
    }
};

const deleteCategory = async cdcategory => {
    const conn = await dbConnection();
    const sql = 'DELETE FROM CATEGORY WHERE CDCATEGORY = ?'
    const verifyRelationshipSql = 'SELECT 1 FROM MEDICATION WHERE CDCATEGORY = ?';

    try {
        const [relation] = await conn.query(verifyRelationshipSql, [cdcategory]);

        if (relation.length > 0) {
            return 'A categoria possui medicamentos relacionados';
        }

        await conn.query(sql, [cdcategory]);
    } catch (Error) {
        console.error('Error: ', Error);
    }

}

module.exports = { getAllCategories, createCategory, deleteCategory };