const Router = require('express').Router()
const {
  landing
} = require('../controllers/home')

Router
  .get('/', landing)

module.exports = Router
