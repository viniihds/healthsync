const {dbConnection} = require("../db");

const getAllmedications = async () => {
    const conn = await dbConnection();
    const sql = 'SELECT MED.cdmedication, MED.nmmedication, CAT.nmcategory FROM MEDICATION MED INNER JOIN CATEGORY CAT ON MED.CDCATEGORY = CAT.CDCATEGORY';

    try {
        const [result] = await conn.query(sql);
        const medications = [];

        console.log('result: ' + JSON.stringify(result, null, 2));
        result.forEach(medication => {
            medications.push(medication);
        })

        console.log(JSON.stringify(medications, null, 2));
        return medications;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getAllmedications };