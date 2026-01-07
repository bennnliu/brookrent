import {Pool} from 'pg';

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env

export const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true
    }
})

export const db = async ()=> {
    const listers = `
    CREATE TABLE IF NOT EXISTS listers(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        number VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    const properties = `
    CREATE TABLE IF NOT EXISTS properties(
        id SERIAL PRIMARY KEY,
        lister_id INTEGER NOT NULL REFERENCES listers(id) ON DELETE CASCADE,
        title VARCHAR(255),
        price INTEGER CHECK (price > 0),
        address VARCHAR(255),
        description TEXT,
        image_urls TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    try{
        await pool.query(listers)
        await pool.query(properties)
    }
    catch(e){
        console.log(e)
    }
}
