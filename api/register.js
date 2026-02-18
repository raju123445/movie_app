const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false })
  }

  const { name, email, password } = req.body
  
  try {
    await pool.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)',
      [name, email, password])
    res.status(200).json({ success: true })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}
