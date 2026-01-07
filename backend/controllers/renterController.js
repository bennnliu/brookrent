import { pool } from '../config/neondb.js';

const getProperties = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM properties');
        return res.status(200).json(result.rows);
    } catch (e) {
        console.error(e);
        return res.status(404).json({ message: "Internal server error" });
    }
};

const getProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
        
        if (property.rows.length === 0) {
            return res.status(404).json({ message: "Property does not exist" });
        }
        const lister_id = property.rows[0].lister_id
        const lister = await pool.query('SELECT name, email, number FROM users WHERE id = $1', [lister_id])
        const result = {...property.rows[0], lister: lister.rows[0]}
        
        return res.status(200).json(result);
    } catch (e) {
        console.error(e);
        return res.status(404).json({ message: "Internal server error" });
    }
};

export { getProperties, getProperty };
