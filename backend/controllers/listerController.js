const { pool } = require('../config/neondb');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const {JWT_SECRET} = process.env

const createListing = async (req, res) => {
    try{
        const jwt_token = verifyToken(req,res)

        //Checks if the body is empty
        if(!req.body || Object.keys(req.body).length === 0){
            console.log("No body")
            return res.json({message: "No body"})
        }

        //Gathers data using body and jwt token
        const lister_id = (await(pool.query(`SELECT id FROM listers WHERE jwt_token = $1`, [jwt_token]))).rows[0].id;
        const {title, price, address, description, image_url} = req.body;
        const query = 
        `INSERT INTO properties (lister_id, title, price, address, description, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
        const values = [lister_id, title, price, address, description, image_url];
        
        //Adds data into database and returns listing
        const result = await pool.query(query, values);
        return res.json(result.rows[0]);
    }
    catch(e){
        console.error(e)
    }
}

const verifyToken = (req,res)=> {
    const authHeader = req.headers.authorization;

        //Checks if auth is empty
        if (!authHeader) {
        return res.json({ message: "Missing Authorization header" });
        }

        //Removes "Bearer" string from token
        let jwt_token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        //Verifes jwt token 
        try{
            jwt.verify(jwt_token, JWT_SECRET)
            return jwt_token
            
        }
        catch(e){
            console.error(e)
            return res.json({message: "Invalid token"})
        
        }
}

module.exports = { createListing };
