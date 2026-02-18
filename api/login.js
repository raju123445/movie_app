const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false })
  }

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
    res.status(400).json({ success: false })
  }
}
