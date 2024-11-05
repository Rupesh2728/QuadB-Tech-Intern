const express = require('express');
const axios = require('axios');
const cors = require("cors");
const { Pool } = require('pg');
const app = express();


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DemoDB',
  password: 'peddineni@2728',
  port: 5432,
});

app.use(cors({
    origin:['http://127.0.0.1:5500'],
    credentials: true,
}));


async function fetchData() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = Object.values(response.data).slice(0, 10); // Top 10 results
    // console.log(data);
    
  
    await pool.query('DELETE FROM tickers');

  
    data.forEach(async (ticker) => {
      const { name, last, buy, sell, volume, base_unit } = ticker;
      await pool.query(
        'INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, last, buy, sell, volume, base_unit]
      );
    });
  } catch (error) {
    console.error(error);
  }
}




fetchData();
setInterval(fetchData, 60000); // Update data every 60 seconds


app.get('/api/tickers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tickers');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = app;

