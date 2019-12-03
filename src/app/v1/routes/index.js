const Router = require('express').Router()

const home = require('./home')
const users = require('./users')
const company = require('./company')
const project = require('./project')

Router
  .use('/', home)
  .use('/users', users)
  .use('/company', company)
  .use('/project', project)

module.exports = Router
