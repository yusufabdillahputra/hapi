const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { response } = require('../../../helper/response')
const jwtHelper = require('../../../helper/jwt')

const usersController = require('../controllers/users')
const usersModel = require('../models/users')

module.exports = {

  signIn: async (req, res) => {
    try {
      const account = await usersModel.readByLogin(req)
      const countAccount = account.rowCount
      if (countAccount > 0) {
        await bcrypt.compare(req.body.password_users, account.rows[0].password_users, async (error, result) => {
          if (error) response(res, 200, 402, error)
          if (result) {
            const payload = {
              id_users: account.rows[0].id_users,
              username_users: account.rows[0].username_users,
              name_users: account.rows[0].name_users,
              role_users: account.rows[0].role_users
            }
            const token = await jwtHelper.getToken(res, payload)
            const model = await usersModel.createRememberToken(token, payload.id_users)

            response(res, 200, 200, {
              token: token,
              model: model
            })
          } else {
            response(res, 200, 401, 'Account passwords wrong')
          }
        })
      }
      if (countAccount === 0 || countAccount === null) {
        response(res, 200, 401, {
          message: 'Account not register yet'
        })
      }
    } catch (error) {
      console.log(error)
      response(res, 200, 500, error)
    }
  },

  signUp: async (req, res) => {
    await usersController.createData(req, res)
  },

  signOut: async (req, res) => {
    try {
      const token = req.headers.jwt
      const id = await JWT.decode(token, { complete: true }).payload.id_users
      const model = await usersModel.destroyRememberToken(id)
      response(res, 200, 200, {
        model: model,
        message: 'Succesfully destroy JWT and logout'
      })
    } catch (error) {
      console.log(error)
      response(res, 200, 500, error)
    }
  }

}
