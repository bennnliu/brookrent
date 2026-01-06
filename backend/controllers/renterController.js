import { pool } from '../config/neondb.js';

const getProperties = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM properties');
        return res.json(result.rows);
    } catch (e) {
        console.error(e);
        return res.json({ message: "Internal server error" });
    }
};

const getProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.json({ message: "Property not found" });
        }
        
        return res.json(result.rows[0]);
    } catch (e) {
        console.error(e);
        return res.json({ message: "Internal server error" });
    }
};

export { getProperties, getProperty };
