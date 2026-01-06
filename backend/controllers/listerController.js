import { pool } from '../config/neondb.js';

const createListing = async (req, res) => {
    try{
        //Gathers data 
        const lister_id = req.user.listerId
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

const updateListing = async (req, res) => {
    try{
        const id = req.params.id;

        //Checks if the id exists
        if((await pool.query(`SELECT id FROM properties WHERE id = $1`,[id])).rows.length === 0){
            return res.json({message: "Listing does not exist"})
        }

        //Checks if the lister_id matches
        const listerId = req.user.listerId
        const property_lister_id  = await pool.query(`SELECT lister_id FROM properties WHERE id = $1`, [id])

        if(listerId !== property_lister_id.rows[0].lister_id){
            return res.json({message: "You do not own this listing"})
        }

        const {title, price, address, description, image_url} = req.body;
        const query = 
        `UPDATE properties SET (title, price, address, description, image_url, updated_at) = 
        ($1, $2, $3, $4, $5, NOW()) WHERE id = $6
        RETURNING *`;
        const values = [title, price, address, description, image_url, id];

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

         //Checks if the lister_id matches
        const listerId = req.user.listerId
        const property_lister_id  = await pool.query(`SELECT lister_id FROM properties WHERE id = $1`, [id])

        if(listerId !== property_lister_id.rows[0].lister_id){
            return res.json({message: "You do not own this listing"})
        }

        pool.query(`DELETE FROM properties WHERE id = $1`,[id])
        return res.json({message: "Listing deleted"})

    }
    catch(e){
        console.error(e)
    }
}

export {createListing, updateListing, deleteListing}
