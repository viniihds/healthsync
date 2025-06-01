const {dbConnection} = require("../db");

const getAllMedications = async () => {
    const conn = await dbConnection();
    const sql = 'SELECT MED.cdmedication, MED.nmmedication, CAT.nmcategory, CAT.cdcategory FROM MEDICATION MED INNER JOIN CATEGORY CAT ON MED.CDCATEGORY = CAT.CDCATEGORY';

    try {
        const [result] = await conn.query(sql);
        const medications = [];

        result.forEach(medication => {
            medications.push(medication);
        })

        return medications;
    } catch (error) {
        console.error('Error: ', error);
    }
};

const createMedication = async med => {
    const conn = await dbConnection();
    const sql = parseInt(med.cdmedication) === -1
        ? 'INSERT INTO MEDICATION (NMMEDICATION, CDCATEGORY) VALUES (?, ?)'
        : `UPDATE MEDICATION SET NMMEDICATION = ?, CDCATEGORY = ? WHERE CDMEDICATION = ${med.cdmedication}`;

    try {
        await conn.query(sql, [med.nmmedication, med.category]);
    } catch (Error) {
        console.error('Error: ', Error);
    }
}

const deleteMedication = async med => {
    const conn = await dbConnection();
    const sql = 'DELETE FROM MEDICATION WHERE CDMEDICATION = ?';

    try {
        await conn.query(sql, [med]);
    } catch (Error) {
        console.error('Error: ', Error);
    }
}

module.exports = { getAllMedications, createMedication, deleteMedication };