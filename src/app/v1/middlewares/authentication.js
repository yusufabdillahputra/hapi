const { response } = require('../../../helper/response')
const jwtHelper = require('../../../helper/jwt')
const JWT = require('jsonwebtoken')
const usersModel = require('../models/users')

module.exports = {

  verifyToken: async (req, res, next) => {
    if (req.headers.jwt) {
      const token = req.get('jwt')
      const decode = await JWT.decode(token, { complete: true })
      if (decode !== null) {
        const fetchToken = await usersModel.readRememberToken(decode.payload.id_users)
        const rememberToken = fetchToken.rows[0].remember_token
        if (rememberToken !== null) {
          if (rememberToken !== token) {
            response(res, 200, 406,  'Your token is not acceptable')
          } if (rememberToken === token) {
            await jwtHelper.verifyToken(req, res, next)
          }
        } else {
          response(res, 200,401, 'Your token is not authorized')
        }
      } else if (decode === null) {
        response(res, 200,401, {
          message: 'Your token is wrong, please login or register'
        })
      }
    } else {
      response(res, 200,401, 'Your token is empty, please login or register')
    }
  },

  next: (req, res, next) => {
    next()
  }

}
