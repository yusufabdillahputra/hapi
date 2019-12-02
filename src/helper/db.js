require('dotenv/config')
const pool = require('../config/pgsql')

module.exports = {
  pool,
  query : (prepare, resolve, reject) => {
    pool.query(prepare, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  },
  schema : (table) => {
    return process.env.DB_SCHEMA+'.'+table
  }
}
