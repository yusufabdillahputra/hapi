const Router = require('express').Router()

const {
  createData,
  readAll,
  updateById,
  updatePhoto,
  verifyById,
  deleteById
} = require('../controllers/company')

Router
  .get('/', readAll)
  .post(`/`, createData)
  .put('/id/:id_company', updateById)
  .put('/verify/:id_company', verifyById)
  .put('/photo/:id_company', updatePhoto)
  .delete('/id/:id_company', deleteById)

module.exports = Router