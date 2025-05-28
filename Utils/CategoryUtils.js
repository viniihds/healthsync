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

module.exports = { getAllCategories };