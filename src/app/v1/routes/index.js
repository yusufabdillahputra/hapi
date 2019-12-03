const Router = require('express').Router()

const home = require('./home')
const users = require('./users')
const company = require('./company')

Router
  .use('/', home)
  .use('/users', users)
  .use('/company', company)

module.exports = Router
