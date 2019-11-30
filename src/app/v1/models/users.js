const db = require('../../../helper/db')

module.exports = {

  readAll : () => {
    return new Promise(((resolve, reject) => {
      const sql = `SELECT * FROM db.vw_root`
      db.query(sql, (error, result) => {
        if (error) reject(error)
        resolve(result.rows)
      })
    }))
  }

}