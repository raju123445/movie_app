const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body
  
  try {
    await pool.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)',
      [name, email, password])
    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false })
  }
})

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1 AND password=$2',
      [email, password])
    if (result.rows.length > 0) {
      res.status(200).json({ success: true })
    } else {
      res.status(401).json({ success: false })
    }
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
