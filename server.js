require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dataRouter = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

app.use(cors());
app.use(express.static('public'));

// Define a route to fetch data
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM observations');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
