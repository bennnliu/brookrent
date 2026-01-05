//Account Creation is only for listers
require('dotenv').config()
const { pool } = require('../config/neondb');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = process.env

const signUp = async (req, res) => {
    try{
        if(!req.body || Object.keys(req.body).length === 0){
            console.log("No body")
            return res.json({message: "No body"})
        }
        const {name, email, password, number} = req.body;
        const token = jwt.sign(password, JWT_SECRET)

        const existing = await pool.query(
        `SELECT * FROM listers WHERE email = $1 OR number = $2`, [email, number]
        );

        if (existing.rows.length > 0) {
            console.log("User already exists")
            return res.json({message: "User already exists"})
        }
        const query = 
        `INSERT INTO listers (name, email, password, number, jwt_token)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;
        const values = [name, email, password, number, token];
        const result = await pool.query(query, values);

        return res.json(result.rows[0].jwt_token);     

    }
    catch(e){
        console.error(e)
    }

}

module.exports = { signUp };

