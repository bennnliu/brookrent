const { pool } = require('../config/neondb');

const getProperties = async (req, res) => {
    try{
        const properties = await pool.query(`SELECT * FROM properties`)
        return res.json(properties.rows);
    }
    catch(e){
        console.error(e)
    }
}

module.exports = { getProperties };