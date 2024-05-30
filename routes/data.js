const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

//comment on what this code (lines 7-13) does
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Route to fetch all observation data
router.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM observations');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
