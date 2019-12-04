const Router = require('express').Router()

const {
  signIn,
  signOut,
  signUp
} = require('../controllers/auth')

Router
  .post('/login', signIn)
  .post('/register', signUp)
  .post('/logout', signOut)

module.exports = Router
