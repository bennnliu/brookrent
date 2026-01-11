import { pool } from '../config/neondb.js';

const getListings = async (req,res) => {
    try{
        const listerId = req.user.listerId
        const result =  await pool.query(`SELECT * FROM properties WHERE lister_id = $1` , [listerId])
        return res.status(200).json(result.rows)
    }
    catch(e){
        res.status(404).send(e)
    }
}

const getListing = async (req, res) => {
    try {
        const userId = req.user.listerId;
        const propertyId = req.params.id;

        const query = `
            SELECT p.*, 
                   json_build_object('name', u.name, 'email', u.email, 'number', u.number) as lister 
            FROM properties p
            JOIN users u ON p.lister_id = u.id
            WHERE p.id = $1
        `;

        const result = await pool.query(query, [propertyId]);

        // 1. Check Existence
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Listing does not exist" });
        }

        const listing = result.rows[0];

        // 2. Check Ownership (Security)
        if (listing.lister_id != userId) {
            return res.status(403).json({ message: "You do not own this listing" });
        }

        return res.status(200).json(listing);

    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

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
        return res.status(200).json(result.rows[0]);
    }
    catch(e){
        res.status(404).error(e)
    }
}

 const updateListing = async (req, res) => {
    try {
        const id = req.params.id;

        // 1. Check if the listing exists
        const listingCheck = await pool.query(`SELECT id, lister_id FROM properties WHERE id = $1`, [id]);
        if (listingCheck.rows.length === 0) {
            return res.status(400).json({ message: "Listing does not exist" });
        }

        // 2. Ownership Check (Security)
        const listerId = req.user.listerId;
        if (listerId !== listingCheck.rows[0].lister_id) {
            return res.status(403).json({ message: "You do not own this listing" });
        }

        // 3. IMAGE LOGIC: Merge Old + New
        // A. Get new file uploads from Cloudinary middleware (defaults to empty array if none)
        const new_uploads = req.image_urls || []; 
        let kept_existing_images = [];

        // B. Get the list of OLD images the user wanted to keep
        // We check if it exists because FormData might not send it if the array is empty
        if (req.body.existing_images) {
            try {
                // We must parse it because FormData sends arrays as stringified JSON
                kept_existing_images = JSON.parse(req.body.existing_images);
            } catch (err) {
                console.error("Failed to parse existing_images", err);
                kept_existing_images = [];
            }
        }

        // C. Combine them into one final array to save to the DB
        // 
        const final_image_urls = [...kept_existing_images, ...new_uploads];

        // 4. Update Database
        const { title, price, address, description } = req.body;
        
        const query = `
            UPDATE properties 
            SET (title, price, address, description, image_urls, updated_at) = 
            ($1, $2, $3, $4, $5, NOW()) 
            WHERE id = $6
            RETURNING *
        `;
        
        // IMPORTANT: We use 'final_image_urls' here
        const values = [title, price, address, description, final_image_urls, id];

        const result = await pool.query(query, values);
        
        // Return the updated row
        return res.status(200).json(result.rows[0]);

    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}
const deleteListing = async (req, res) => {
    try{
        const id = req.params.id;

        //Checks if the id exists
        if((await pool.query(`SELECT id FROM properties WHERE id = $1`,[id])).rows.length === 0){
            return res.status(400).json({message: "Listing does not exist"})
        }

         //Checks if the lister_id matches
        const listerId = req.user.listerId
        const property_lister_id  = await pool.query(`SELECT lister_id FROM properties WHERE id = $1`, [id])

        if(listerId !== property_lister_id.rows[0].lister_id){
            return res.status(403).json({message: "You do not own this listing"})
        }

        await pool.query(`DELETE FROM properties WHERE id = $1`,[id])
        return res.status(200).json({message: "Listing deleted"})

    }
    catch(e){
       res.status(404).send(e)
    }
}

export {getListings, getListing, createListing, updateListing, deleteListing}
