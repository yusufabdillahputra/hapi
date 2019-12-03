const Router = require('express').Router()

const home = require('./home')
const users = require('./users')
const company = require('./company')
const project = require('./project')
const skill = require('./skill')

Router
  .use('/', home)
  .use('/users', users)
  .use('/company', company)
  .use('/project', project)
  .use('/skill', skill)

module.exports = Router
