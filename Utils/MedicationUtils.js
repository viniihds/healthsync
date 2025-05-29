const {dbConnection} = require("../db");

const getAllMedications = async () => {
    const conn = await dbConnection();
    const sql = 'SELECT MED.cdmedication, MED.nmmedication, CAT.nmcategory FROM MEDICATION MED INNER JOIN CATEGORY CAT ON MED.CDCATEGORY = CAT.CDCATEGORY';

    try {
        const [result] = await conn.query(sql);
        const medications = [];

        result.forEach(medication => {
            medications.push(medication);
        })

        return medications;
    } catch (error) {
        console.log('Error: ', error);
    }
};

const createMedication = async medication => {
    const conn = await dbConnection();
    const sql = 'INSERT INTO MEDICATION (NMMEDICATION, CDCATEGORY) VALUES (?, ?)'

    console.log('Dados do remédio: ' + JSON.stringify(medication, null, 2));

    try {
        await conn.query(sql, [medication.nmmedication, medication.category]);
    } catch (Error) {
        console.error('Error: ', Error);
    }
}

module.exports = { getAllMedications, createMedication };