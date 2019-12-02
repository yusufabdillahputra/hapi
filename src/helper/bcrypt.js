require('dotenv/config')
const bcrypt = require('bcryptjs')

module.exports = {

  hash: (password = null) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) reject(error)
        resolve(hash)
      })
    })
  }

}
