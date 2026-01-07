//Account Creation is only for listers
import { pool } from '../config/neondb.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const {JWT_SECRET} = process.env

const signUp = async (req, res) => {
    try{ 
        //Check if req even contains anything
        if(!req.body || Object.keys(req.body).length === 0){
            console.log("No body")
            return res.status(400).json({message: "No body"})
        }
        //Create and set user's data
        const {name, email, password, number} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        //Check if the user's email or number already exists
        const existing = await pool.query(`SELECT * FROM users WHERE email = $1 OR number = $2`, [email, number]);

        if (existing.rows.length > 0) {
            console.log("User already exists")
            return res.status(400).json({message: "User already exists"})
        }

        //Add user's data into database
        const query = `INSERT INTO users (name, email, password, number) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [name, email, hashedPassword, number];
        await pool.query(query, values);

        //Return the user's jwt token 
        return login(req, res)  
       
    }
    catch(e){
        res.status(404).send(e)
    }

}

const login = async (req, res) => {
    try{
        //Check if req even contains anything
        if(!req.body || Object.keys(req.body).length === 0){
            console.log("No body")
            return res.status(400).json({message: "No body"})
        }
        const {email, password} = req.body;

        //Checks if user's data exists
        const potential_user_data = await pool.query(`SELECT password FROM users WHERE email = $1`, [email]);
        
         //When user's data does not exists
        if(potential_user_data.rows.length === 0){
            console.log("User does not exist")
            return res.status(400).json({message: "User does not exist"})
        }

        //Checks if the passwords match
        const matchedPasswords = await bcrypt.compare(password, potential_user_data.rows[0].password);
        if (!matchedPasswords) {
            console.log("Incorrect password")
            return res.status(400).json({message: "Incorrect password"})
        }
        
        const user_data = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const payload = {listerId: user_data.rows[0].id, email: user_data.rows[0].email, role: user_data.rows[0].role}
        const token = jwt.sign(payload, JWT_SECRET,{expiresIn: "1h" })
        return res.status(200).json({email: user_data.rows[0].email, name: user_data.rows[0].name, token: token});   
    }
    catch(e){
        res.status(404).send(e)
    }
}
export { signUp, login };
