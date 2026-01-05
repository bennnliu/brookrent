//Account Creation is only for listers
require('dotenv').config()
const { pool } = require('../config/neondb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {JWT_SECRET} = process.env

const signUp = async (req, res) => {
    try{ 
        //Check if req even contains anything
        if(!req.body || Object.keys(req.body).length === 0){
            console.log("No body")
            return res.json({message: "No body"})
        }
        //Create and set user's data
        const {name, email, password, number} = req.body;
        const token = jwt.sign(email, JWT_SECRET)
        const hashedPassword = await bcrypt.hash(password, 10);

        //Check if the user's email or number already exists
        const existing = await pool.query(`SELECT * FROM listers WHERE email = $1 OR number = $2`, [email, number]);

        if (existing.rows.length > 0) {
            console.log("User already exists")
            return res.json({message: "User already exists"})
        }

        //Add user's data into database
        const query = `INSERT INTO listers (name, email, password, number, jwt_token) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [name, email, hashedPassword, number, token];
        const result = await pool.query(query, values);

        //Return the user's jwt token 
        return res.json(result.rows[0].jwt_token);     

    }
    catch(e){
        console.error(e)
    }

}

const login = async (req, res) => {
    try{
        //Check if req even contains anything
        if(!req.body || Object.keys(req.body).length === 0){
            console.log("No body")
            return res.json({message: "No body"})
        }
        const {email, password} = req.body;

        //Checks if user's data exists
        const potentialUserData = await pool.query(`SELECT password, jwt_token FROM listers WHERE email = $1`, [email]);
        
         //When user's data does not exists
        if(potentialUserData.rows.length === 0){
            console.log("User does not exist")
            return res.json({message: "User does not exist"})
        }
        matchedPasswords = await bcrypt.compare(password, potentialUserData.rows[0].password);
        if (!matchedPasswords) {
            console.log("Incorrect password")
            return res.json({message: "Incorrect password"})
        }
        
        const jwt_token = potentialUserData.rows[0].jwt_token;
        return res.json(jwt_token);
    }
    catch(e){
        console.error(e)
    }
}
module.exports = { signUp, login };

