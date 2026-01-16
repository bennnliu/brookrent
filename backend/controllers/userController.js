//Account Creation is only for listers
import { pool } from '../config/neondb.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Resend } from "resend";

const {JWT_SECRET, RESEND_KEY, NODE_ENV} = process.env
const resend = new Resend(RESEND_KEY)

const signUp = async (req, res) => {
    try{ 
        //Check if req even contains anything
        if(!req.body || Object.keys(req.body).length === 0){
            console.log("No body")
            return res.status(400).json({message: "No body"})
        }
        //Create and set user's data
        const {name, email, password, number} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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
        return res.cookie('jwtToken', token, {
            httpOnly: true, 
            secure: NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            domain: process.env.NODE_ENV === 'production' ? '.brookrents.com' : undefined,
            sameSite: 'Lax',
        }).status(200).send();   
    }
    catch(e){
        res.status(404).send(e)
    }
}

const getUserData = async (req, res) => {
    try{
        const listerId = req.user.listerId
        const userData =  await pool.query(`SELECT name, email, role FROM users WHERE id = $1`, [listerId])
        if (userData.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.send(userData.rows[0]);
    } catch (e) {
        console.error("Error getting user data:", e.message); 
        res.status(500).send(e);
    }
}

const signOut = async (req, res) => {
    try {
        res.clearCookie('jwtToken', {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'Lax' 
        });

        res.status(200).send({ message: "Logged out successfully" });
    }
    catch (e) {
        console.error("Logout Error:", e);
        res.status(500).send(e);
    }
}

const contact = async (req,res) => {
    try{
        const {data, error} = await resend.emails.send({
            from: "BrookRents Team <info@brookrents.com>",
            to: "brookrents@gmail.com",
            replyTo: req.body.email,
            subject: "New Inquiry from BrookRent Website",
            text: `You received a new message from ${req.body.email}:\n\n${req.body.message}`
        })
        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ data });
    }   
    catch(e){

    }
}

export { signUp, login , getUserData, signOut, contact};
