
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

app.post('/register', async (req,res)=>{
  const {name,email,password} = req.body
  try {
    await pool.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)',
      [name,email,password])
    res.send({success:true})
  } catch(err) {
    res.send({success:false})
  }
})

app.post('/login', async (req,res)=>{
  const {email,password} = req.body
  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1 AND password=$2',
      [email,password])
    if(result.rows.length>0) res.send({success:true})
    else res.send({success:false})
  } catch(err) {
    res.send({success:false})
  }
})

app.listen(process.env.PORT, ()=>console.log('Server running'))
