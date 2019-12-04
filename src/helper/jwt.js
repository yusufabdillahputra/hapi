require('dotenv/config')
const JWT = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const { response } = require('./response')

module.exports = {

  getToken: (res, payload) => {
    return JWT.sign(payload, JWT_SECRET_KEY, {
      expiresIn: '24h'
    })
  },

  verifyToken: async (req, res, next) => {
    const token = req.headers.jwt
    await JWT.verify(token, JWT_SECRET_KEY, (error) => {
      if (error && error.name === 'TokenExpiredError') response(res, 200, 401, error)
      if (error && error.name === 'JsonWebTokenError') response(res, 200, 401, error)
      next()
    })
  }

}
