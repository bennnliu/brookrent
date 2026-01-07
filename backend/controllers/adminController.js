import { pool } from '../config/neondb.js';

const createListing = async (req, res) => {
    try{
        //Gathers data 
        const listerId = req.user.listerId
        const image_urls = req.image_urls
        const {title, price, address, description} = req.body;
        const query = 
        `INSERT INTO properties (lister_id, title, price, address, description, image_urls)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
        const values = [listerId, title, price, address, description, image_urls];
        
        //Adds data into database and returns listing
        const result = await pool.query(query, values);
        return res.json(result.rows[0]);
    }
    catch(e){
        console.error(e)
    }
}

const updateListing = async (req, res) => {
    try{
        const id = req.params.id;

        //Checks if the id exists
        if((await pool.query(`SELECT id FROM properties WHERE id = $1`,[id])).rows.length === 0){
            return res.json({message: "Listing does not exist"})
        }
        const image_urls = req.image_urls
        const {title, price, address, description} = req.body;
        const query = 
        `UPDATE properties SET (title, price, address, description, image_urls, updated_at) = 
        ($1, $2, $3, $4, $5, NOW()) WHERE id = $6
        RETURNING *`;
        const values = [title, price, address, description, image_urls, id];

        const result = await pool.query(query,values)
        return res.json(result.rows[0])

    }
    catch(e){
        console.error(e)
    }
}

const deleteListing = async (req, res) => {
    try{
        const id = req.params.id;

        //Checks if the id exists
        if((await pool.query(`SELECT id FROM properties WHERE id = $1`,[id])).rows.length === 0){
            return res.json({message: "Listing does not exist"})
        }

        pool.query(`DELETE FROM properties WHERE id = $1`,[id])
        return res.json({message: "Listing deleted"})

    }
    catch(e){
        console.error(e)
    }
}

export {createListing, updateListing, deleteListing}