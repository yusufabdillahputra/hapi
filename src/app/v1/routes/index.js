const Router = require('express').Router()

const home = require('./home')
const auth = require('./auth')
const users = require('./users')
const company = require('./company')
const project = require('./project')
const skill = require('./skill')

Router
  .use('/', home)
  .use('/auth', auth)
  .use('/users', users)
  .use('/corp', company)
  .use('/project', project)
  .use('/skill', skill)

module.exports = Router
