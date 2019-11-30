require('dotenv/config')
const { Pool } = require('pg')
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  schema: process.env.DB_SCHEMA
})

pool.connect(error => {
  if (error) throw error
  console.log('Database connected')
})

module.exports = pool