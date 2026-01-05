const { pool } = require('../config/neondb');

const createListing = async (req, res) => {
    try{
        if(!req.body || Object.keys(req.body).length === 0){
            console.log("No body")
            return
        }
        const {lister_id, title, price, address, description, image_url} = req.body;
        const query = 
        `INSERT INTO properties (lister_id, title, price, address, description, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
        const values = [lister_id, title, price, address, description, image_url];
        
        const result = await pool.query(query, values);
        return res.json(result.rows[0]);
    }
    catch(e){
        console.error(e)
    }
}


module.exports = { createListing };
